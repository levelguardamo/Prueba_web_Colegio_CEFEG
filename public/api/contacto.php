<?php
/**
 * Formulario de contacto — Colegio Cristiano CEFEG
 * PHPMailer + SMTP. Sin mail() nativo. Honeypot anti-spam.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

// Solo POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Método no permitido.']);
    exit;
}

// Honeypot: si viene relleno es un bot
$honeypot = trim($_POST['website'] ?? '');
if ($honeypot !== '') {
    // Respuesta silenciosa para no revelar detección
    http_response_code(200);
    echo json_encode(['ok' => true]);
    exit;
}

// Sanitizar y validar
$nombre  = trim(strip_tags($_POST['nombre']  ?? ''));
$email   = trim($_POST['email']   ?? '');
$telefono= trim(strip_tags($_POST['telefono'] ?? ''));
$asunto  = trim(strip_tags($_POST['asunto']  ?? ''));
$mensaje = trim(strip_tags($_POST['mensaje'] ?? ''));

$errores = [];
if (empty($nombre))  $errores[] = 'El nombre es requerido.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errores[] = 'El correo no es válido.';
if (empty($asunto))  $errores[] = 'El asunto es requerido.';
if (strlen($mensaje) < 10) $errores[] = 'El mensaje es demasiado corto.';

if (!empty($errores)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => implode(' ', $errores)]);
    exit;
}

// Cargar PHPMailer via Composer (debe estar en /vendor en el servidor)
$autoload = __DIR__ . '/../../vendor/autoload.php';
if (!file_exists($autoload)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Error de configuración del servidor.']);
    exit;
}
require $autoload;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Configuración SMTP — ajustar en el servidor
$smtp_host     = getenv('SMTP_HOST')     ?: 'smtp.gmail.com';
$smtp_port     = (int)(getenv('SMTP_PORT') ?: 587);
$smtp_user     = getenv('SMTP_USER')     ?: 'tu@correo.com';
$smtp_pass     = getenv('SMTP_PASS')     ?: '';
$smtp_from     = getenv('SMTP_FROM')     ?: 'coordinacion@colegiocefeg.edu.co';
$smtp_name     = getenv('SMTP_FROM_NAME') ?: 'Colegio Cristiano CEFEG';
$destino_email = 'coordinacion@colegiocefeg.edu.co';

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = $smtp_host;
    $mail->SMTPAuth   = true;
    $mail->Username   = $smtp_user;
    $mail->Password   = $smtp_pass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = $smtp_port;
    $mail->CharSet    = 'UTF-8';

    // Remitente y destinatario
    $mail->setFrom($smtp_from, $smtp_name);
    $mail->addAddress($destino_email, 'Coordinación CEFEG');
    $mail->addReplyTo($email, $nombre);

    // Contenido
    $mail->isHTML(true);
    $mail->Subject = "Contacto web: {$asunto}";

    $asuntoLabel = match($asunto) {
        'matriculas'  => 'Información sobre matrículas',
        'costos'      => 'Costos y tarifas 2026',
        'admision'    => 'Proceso de admisión',
        'servicios'   => 'Servicios educativos',
        'donaciones'  => 'Donaciones a la corporación',
        default       => 'Otro',
    };

    $telefonoHtml = $telefono ? "<p><strong>Teléfono:</strong> {$telefono}</p>" : '';

    $mail->Body = "
    <div style='font-family:sans-serif;max-width:600px;margin:auto;border:1px solid #e0e4ef;border-radius:8px;overflow:hidden;'>
      <div style='background:#001A5A;padding:24px 32px;'>
        <h2 style='color:#fff;margin:0;font-size:20px;'>Nuevo mensaje de contacto</h2>
        <p style='color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:13px;'>Sitio web Colegio Cristiano CEFEG</p>
      </div>
      <div style='padding:24px 32px;'>
        <p><strong>Nombre:</strong> {$nombre}</p>
        <p><strong>Correo:</strong> <a href='mailto:{$email}'>{$email}</a></p>
        {$telefonoHtml}
        <p><strong>Asunto:</strong> {$asuntoLabel}</p>
        <hr style='border:none;border-top:1px solid #e0e4ef;margin:16px 0;'>
        <p><strong>Mensaje:</strong></p>
        <p style='background:#f7f8fa;padding:16px;border-radius:6px;line-height:1.7;'>" . nl2br(htmlspecialchars($mensaje)) . "</p>
      </div>
      <div style='background:#f7f8fa;padding:16px 32px;font-size:12px;color:#888;'>
        Enviado desde el formulario de contacto del sitio web del Colegio Cristiano CEFEG.
      </div>
    </div>";

    $mail->AltBody = "Nombre: {$nombre}\nCorreo: {$email}\nTeléfono: {$telefono}\nAsunto: {$asuntoLabel}\n\nMensaje:\n{$mensaje}";

    $mail->send();

    http_response_code(200);
    echo json_encode(['ok' => true, 'message' => '¡Mensaje enviado! Nos comunicaremos contigo pronto.']);

} catch (Exception $e) {
    http_response_code(500);
    error_log("PHPMailer error: " . $mail->ErrorInfo);
    echo json_encode(['ok' => false, 'message' => 'No se pudo enviar el mensaje. Por favor escríbenos por WhatsApp.']);
}
