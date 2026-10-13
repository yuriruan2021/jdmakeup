import { contact, whatsappTemplate } from '../data/content';

/**
 * Monta o link do WhatsApp com a mensagem pré-preenchida da copy.
 * Quando o serviço é conhecido (card de serviço/combo), substitui "[serviço]".
 */
export function buildWhatsAppUrl(service) {
  const message = service ? whatsappTemplate.replace('[serviço]', service) : whatsappTemplate;
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
