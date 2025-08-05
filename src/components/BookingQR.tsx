import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Download, RefreshCw } from 'lucide-react';

interface BookingQRProps {
  booking: {
    id: number;
    qr_code: string;
    qr_expires_at: string;
    status: string;
    service_name?: string;
    class_date?: string;
  };
  onRefresh?: () => void;
}

export function BookingQR({ booking, onRefresh }: BookingQRProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (booking.qr_code) {
      generateQR();
    }
    checkExpiration();
  }, [booking.qr_code, booking.qr_expires_at]);

  const generateQR = async () => {
    try {
      const url = await QRCode.toDataURL(booking.qr_code, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrDataUrl(url);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const checkExpiration = () => {
    const expirationDate = new Date(booking.qr_expires_at);
    const now = new Date();
    setIsExpired(now > expirationDate);
  };

  const downloadQR = () => {
    if (qrDataUrl) {
      const link = document.createElement('a');
      link.href = qrDataUrl;
      link.download = `booking-${booking.id}-qr.png`;
      link.click();
    }
  };

  const formatExpirationTime = () => {
    const expirationDate = new Date(booking.qr_expires_at);
    return expirationDate.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-lg">Código QR de Reserva</CardTitle>
        <Badge variant={isExpired ? "destructive" : "default"}>
          {isExpired ? "Expirado" : "Activo"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          {qrDataUrl ? (
            <div className="p-4 bg-white rounded-lg">
              <img 
                src={qrDataUrl} 
                alt={`QR Code para reserva ${booking.id}`}
                className="w-48 h-48"
              />
            </div>
          ) : (
            <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Generando QR...</span>
            </div>
          )}
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Código: {booking.qr_code}
          </p>
          <p className="text-xs text-muted-foreground">
            Expira: {formatExpirationTime()}
          </p>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={downloadQR} 
            variant="outline" 
            className="flex-1"
            disabled={!qrDataUrl || isExpired}
          >
            <Download className="w-4 h-4 mr-2" />
            Descargar
          </Button>
          {onRefresh && (
            <Button 
              onClick={onRefresh} 
              variant="outline"
              size="icon"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}