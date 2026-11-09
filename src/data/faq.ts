import type { Locale } from "@/i18n";
import type { FaqItem, SystemId } from "@/types";

/**
 * Frequently asked questions per live system, phrased the way people search.
 * Every answer restates what src/data/systems.ts already says about that
 * system: no banks named, no prices, no timelines, and Arena Restobar is the
 * only client that may be named.
 */
export const faqs: Partial<Record<SystemId, Record<Locale, FaqItem[]>>> = {
  valhalla: {
    es: [
      {
        q: "¿Valhalla cobra en dólares y en bolívares?",
        a: "Sí. La caja trabaja con una sola tasa oficial BCV para todo el sistema, con fuente de respaldo, y acepta pagos mixtos: efectivo, tarjeta, transferencia, pago móvil y descuento por nómina. El cierre de cada turno da los totales en dólares y en bolívares, desglosados por método de pago.",
      },
      {
        q: "¿Puedo ponerle el nombre y los colores de mi restaurante?",
        a: "Sí, es marca blanca: nombre, logos, ícono y paleta de colores para tema claro y oscuro, e incluso el vocabulario, para que mesonero, mesa, cocina o barra se llamen como en tu local. Cada cliente tiene su propia instalación, con su dominio y su base de datos.",
      },
      {
        q: "¿Cómo llegan los pedidos a la cocina y a la barra?",
        a: "Cada producto sale por su estación en una comanda separada, a impresoras térmicas de 58 mm (hasta tres: caja, cocina y barra) o a pantallas de estación en el teléfono que se actualizan en vivo. Si cae la impresora de una estación, el ticket sale por caja con aviso.",
      },
      {
        q: "¿El inventario se descuenta solo con cada venta?",
        a: "Sí, por receta. Cada producto tiene sus insumos, incluidas las preparaciones dentro de otras, y se descuentan del almacén al entregar lo vendido. Los movimientos de inventario no se borran y los conteos físicos se hacen a ciegas, con alerta si la diferencia es grande.",
      },
      {
        q: "¿Qué equipos necesito para usarlo?",
        a: "El punto de venta y el panel funcionan en el navegador. Mesoneros y estaciones usan la app para Android e iOS o la versión instalable (PWA), y la impresión térmica va con un servicio para Windows o Linux que arranca solo con la PC.",
      },
      {
        q: "¿Valhalla ya funciona en algún negocio?",
        a: "Sí. Valhalla ERP está en producción en Arena Restobar, con caja, mesas, comandas, inventario y nómina en uso diario.",
      },
    ],
    en: [
      {
        q: "Does Valhalla take payments in dollars and bolívares?",
        a: "Yes. Checkout uses one official BCV rate across the system, with a fallback source, and accepts mixed payments: cash, card, transfer, mobile payment and payroll deduction. Each shift close gives totals in dollars and bolívares, broken down by payment method.",
      },
      {
        q: "Can it carry my restaurant's name and colors?",
        a: "Yes, it is white label: name, logos, icon and color palette for light and dark themes, and even the vocabulary, so waiter, table, kitchen or bar are called what your venue calls them. Each client gets its own installation, with its own domain and database.",
      },
      {
        q: "How do orders reach the kitchen and the bar?",
        a: "Each item goes to its own station on a separate ticket, to 58 mm thermal printers (up to three: register, kitchen and bar) or to station screens on the phone that update live. If a station printer fails, the ticket prints at the register with a warning.",
      },
      {
        q: "Is inventory deducted automatically with each sale?",
        a: "Yes, by recipe. Each item has its ingredients, including nested preparations, and they are deducted from the warehouse when the sale is delivered. Stock movements cannot be deleted and physical counts are blind, with an alert on large variances.",
      },
      {
        q: "What equipment do I need?",
        a: "The point of sale and the panel run in the browser. Waiters and stations use the Android and iOS app or the installable PWA, and thermal printing runs through a Windows or Linux service that starts with the PC.",
      },
      {
        q: "Is Valhalla already running at a business?",
        a: "Yes. Valhalla ERP is in production at Arena Restobar, with checkout, tables, station tickets, inventory and payroll in daily use.",
      },
    ],
  },

  bifrost: {
    es: [
      {
        q: "¿Bifrost emite facturas según la normativa del SENIAT?",
        a: "Sí. Las facturas tienen número de control sin saltos ni duplicados y no se editan: se corrigen con nota de crédito, con PIN, o de débito. El IVA va desglosado, el IGTF se cobra solo sobre lo pagado en divisas y el libro de ventas mensual se exporta a Excel y PDF.",
      },
      {
        q: "¿Cómo controla la morosidad de los socios?",
        a: "Cada tipo de socio tiene su cuota mensual. Pasada la tolerancia, el socio entra en lista gris y se bloquean su entrada, sus carnets y sus pases; al pagar queda reactivado solo. Un pago reportado desde la app no levanta la morosidad hasta que se confirma contra el banco.",
      },
      {
        q: "¿El carnet con QR funciona si no hay señal en la puerta?",
        a: "Sí, el carnet digital con QR funciona sin señal. El vigilante valida el QR o la cédula desde la app en cada puerta, y el sistema niega la entrada por morosidad, lista negra o carnet vencido.",
      },
      {
        q: "¿Los socios tienen su propia app?",
        a: "Sí. Hay app para Android e iOS según el perfil: socios, porteros y deportistas. El socio reporta sus pagos con comprobante, reserva salón o caney, y gestiona su cupo mensual de invitados, con un QR por invitado.",
      },
      {
        q: "¿Puede llevar el nombre y el logo de mi club?",
        a: "Sí. Cada club tiene su propia instalación, con su dominio, su base de datos y su app. Nombre, logo, colores, datos fiscales y cuentas de pago se configuran desde el panel, y las cuotas, el pronto pago, la morosidad y el IGTF se ajustan sin programar.",
      },
      {
        q: "¿Cuánto tarda la implementación en un club?",
        a: "Depende de los módulos que active el club y de cómo opera hoy. En la demo revisamos tu caso y te damos un plan con fechas concretas.",
      },
    ],
    en: [
      {
        q: "Does Bifrost issue invoices under SENIAT rules?",
        a: "Yes. Invoices carry a control number with no gaps or duplicates and cannot be edited: they are corrected with a credit note, with a PIN, or a debit note. VAT is itemized, IGTF applies only to what was paid in foreign currency, and the monthly sales ledger exports to Excel and PDF.",
      },
      {
        q: "How does it handle members who fall behind on dues?",
        a: "Each member type has its monthly fee. After the grace period the member goes on a grey list and their entry, cards and passes are blocked; paying reactivates them automatically. A payment reported in the app does not clear the arrears until it is confirmed against the bank.",
      },
      {
        q: "Does the QR card work without signal at the gate?",
        a: "Yes, the digital QR card works without signal. The guard validates the QR or ID number from the app at each gate, and the system denies entry for arrears, a blacklist or an expired card.",
      },
      {
        q: "Do members get their own app?",
        a: "Yes. There is an Android and iOS app for each profile: members, gate staff and athletes. Members report payments with a receipt, book halls or pavilions, and manage their monthly guest quota, with one QR per guest.",
      },
      {
        q: "Can it carry my club's name and logo?",
        a: "Yes. Each club gets its own installation, with its own domain, database and app. Name, logo, colors, tax details and payment accounts are set from the panel, and fees, early payment, arrears and IGTF are adjusted without programming.",
      },
      {
        q: "How long does it take to set up in a club?",
        a: "It depends on which modules the club turns on and how it operates today. In the demo we review your case and give you a plan with concrete dates.",
      },
    ],
  },

  heimdall: {
    es: [
      {
        q: "¿Cómo verifica Heimdall un pago móvil?",
        a: "Consulta cada pago registrado directamente en la banca en línea del negocio y exige el monto en bolívares exacto al céntimo; si falta algo, dice cuánto. Si el banco no responde, reintenta solo. Con el pago verificado se puede cerrar la cuenta, facturar y liberar la mesa.",
      },
      {
        q: "¿Con qué bancos funciona?",
        a: "Heimdall se conecta a la banca en línea de la cuenta donde el negocio recibe sus pagos móviles. En la demo revisamos tu banco y tu cuenta y te confirmamos cómo quedaría la conexión.",
      },
      {
        q: "¿Evita que usen la misma referencia dos veces?",
        a: "Sí. Avisa si una referencia ya se usó, con quién la cargó, cuándo y por cuánto, y detecta un mismo movimiento del banco usado para pagar dos órdenes. Una referencia nunca se cobra dos veces.",
      },
      {
        q: "¿Qué hace con la foto del comprobante?",
        a: "El mesonero o el cajero toma la foto con el teléfono y el sistema revisa si la referencia y el monto aparecen en ella. Si no pudo leer la imagen lo dice, en vez de darla por buena. En caja se comparan lo tecleado, la foto y lo que dice el banco.",
      },
      {
        q: "¿Se integra con mi punto de venta?",
        a: "Heimdall viene integrado en Valhalla ERP y en Bifrost ERP y envía avisos en tiempo real al punto de venta: el mesonero recibe en su teléfono la confirmación del banco. Si usas otro sistema, lo revisamos contigo en la demo.",
      },
    ],
    en: [
      {
        q: "How does Heimdall verify a mobile payment?",
        a: "It checks each recorded payment directly in the business's online banking and requires the exact bolívar amount down to the cent; if something is missing, it says how much. If the bank does not respond, it retries on its own. Once verified, the bill can be closed, invoiced and the table released.",
      },
      {
        q: "Which banks does it work with?",
        a: "Heimdall connects to the online banking of the account where the business receives its mobile payments. In the demo we review your bank and account and confirm how the connection would work.",
      },
      {
        q: "Does it stop the same reference from being used twice?",
        a: "Yes. It warns when a reference was already used, showing who entered it, when and for how much, and detects one bank movement used to pay two orders. A reference is never collected twice.",
      },
      {
        q: "What does it do with the receipt photo?",
        a: "The waiter or cashier takes the photo with the phone and the system checks whether the reference and amount appear in it. If it could not read the image, it says so instead of accepting it. At the register, what was typed, the photo and what the bank says are compared side by side.",
      },
      {
        q: "Does it work with my point of sale?",
        a: "Heimdall comes built into Valhalla ERP and Bifrost ERP and sends real-time notices to the point of sale: the waiter gets the bank's confirmation on their phone. If you use another system, we review it with you in the demo.",
      },
    ],
  },

  thor: {
    es: [
      {
        q: "¿Qué métodos de pago acepta el kiosco Thor?",
        a: "Pago móvil, confirmado automáticamente contra el banco, y BioPago. Los precios están en dólares con el IVA desglosado y el monto en bolívares se calcula exacto a la tasa BCV del día.",
      },
      {
        q: "¿Qué recibe el cliente después de pagar?",
        a: "Con el pago confirmado, la pantalla muestra el pase con QR y la factura, y el pase también le llega por SMS, aunque ya se haya ido. Mientras se espera al banco, recibe un código para reclamar en la caja.",
      },
      {
        q: "¿Es seguro dejar el equipo en un área pública?",
        a: "Sí. Funciona en modo kiosco, sin menú ni acceso al panel administrativo, y salir de ese modo exige el PIN de un supervisor. Vuelve solo al inicio si nadie lo usa, y como la pantalla es pública nunca muestra teléfono, deuda ni foto.",
      },
      {
        q: "¿Los socios pueden pagar su cuota en el kiosco?",
        a: "Sí. El socio entra con un código de 6 dígitos que recibe por SMS y puede pagar la cuota del mes, reservar caney o salón con el pago incluido y consultar sus invitados y su pase de piscina.",
      },
      {
        q: "¿Qué equipo necesito?",
        a: "Una pantalla táctil en modo kiosco o cualquier equipo con navegador. El catálogo y los precios se administran desde la caja del negocio.",
      },
    ],
    en: [
      {
        q: "Which payment methods does the Thor kiosk accept?",
        a: "Mobile payment, confirmed automatically against the bank, and BioPago. Prices are in dollars with VAT itemized, and the bolívar amount is calculated exactly at the day's BCV rate.",
      },
      {
        q: "What does the customer get after paying?",
        a: "Once the payment is confirmed, the screen shows the QR pass and the invoice, and the pass also arrives by SMS, even if they already left. While waiting on the bank, they get a code to claim at the register.",
      },
      {
        q: "Is it safe to leave the device in a public area?",
        a: "Yes. It runs in kiosk mode, with no menu or access to the admin panel, and leaving that mode requires a supervisor PIN. It returns to the start when idle, and because the screen is public it never shows a phone number, debt or photo.",
      },
      {
        q: "Can members pay their dues at the kiosk?",
        a: "Yes. Members sign in with a 6-digit code sent by SMS and can pay the month's dues, book a pavilion or hall with payment included, and check their guests and pool pass.",
      },
      {
        q: "What equipment do I need?",
        a: "A touchscreen in kiosk mode or any device with a browser. The catalog and prices are managed from the business's register.",
      },
    ],
  },

  asgard: {
    es: [
      {
        q: "¿Asgard calcula prestaciones sociales y liquidaciones según la LOTTT?",
        a: "Sí. Lleva el depósito trimestral de prestaciones y los días adicionales por antigüedad, calcula la liquidación a la fecha de egreso aunque se pague después y paga lo mayor entre lo depositado y el cálculo retroactivo. Puedes simular la liquidación de cualquier empleado sin guardar nada.",
      },
      {
        q: "¿Cómo funciona el control de asistencia?",
        a: "El empleado marca entrada y salida desde la app con una selfie, solo dentro del perímetro del local, verificado por ubicación. Se usa la hora del servidor, se manejan turnos nocturnos, no hay marcas duplicadas y hay minutos de tolerancia antes de contar como tarde.",
      },
      {
        q: "¿La nómina incluye comisiones y propinas?",
        a: "Sí. La nómina semanal suma días, comisiones, propinas y bonos y resta préstamos, consumos y otros descuentos. La comisión es configurable sobre ventas o servicio y sale solo de órdenes pagadas.",
      },
      {
        q: "¿Qué obligaciones legales cubre?",
        a: "La cuota de 5 % de trabajadores con discapacidad y el reporte CONAPDIS, la validación de inamovilidad antes de un despido, LOPCYMAT (delegados, comité de seguridad, notificación de riesgos y exámenes) y la declaración al MINTRA con el cálculo de la contribución de pensiones.",
      },
      {
        q: "¿Los empleados piden vacaciones desde el teléfono?",
        a: "Sí. Piden permisos y vacaciones desde la app y otra persona los aprueba: nadie aprueba lo suyo, ni el administrador. Los días y el bono vacacional se calculan según la LOTTT, y el sistema avisa si se piden más días de los disponibles.",
      },
      {
        q: "¿Se conecta con la caja y la contabilidad del negocio?",
        a: "Sí. Está construido sobre los núcleos de nuestros ERP: se integra con la caja y el punto de venta para comisiones, propinas y consumos, y con tesorería, donde cada liquidación crea sola su cuenta por pagar.",
      },
    ],
    en: [
      {
        q: "Does Asgard calculate severance and final settlements under the LOTTT?",
        a: "Yes. It tracks quarterly severance deposits and extra days for seniority, calculates the settlement as of the exit date even if it is paid later, and pays the greater of what was deposited and the retroactive calculation. You can simulate any employee's settlement without saving anything.",
      },
      {
        q: "How does attendance tracking work?",
        a: "Employees clock in and out from the app with a selfie, only within the premises' perimeter, verified by location. It uses server time, handles night shifts, prevents duplicate punches and allows grace minutes before counting someone late.",
      },
      {
        q: "Does payroll include commissions and tips?",
        a: "Yes. Weekly payroll adds days, commissions, tips and bonuses and subtracts loans, meals and other deductions. Commission is configurable on sales or service and comes only from paid orders.",
      },
      {
        q: "Which legal obligations does it cover?",
        a: "The 5% quota of workers with disabilities and the CONAPDIS report, job-protection checks before a dismissal, LOPCYMAT (delegates, safety committee, risk notices and exams) and the MINTRA filing with the pension contribution calculation.",
      },
      {
        q: "Can employees request vacation from their phone?",
        a: "Yes. They request leave and vacation in the app and someone else approves it: nobody approves their own, not even the administrator. Days and vacation bonus are calculated under the LOTTT, and the system warns when more days are requested than available.",
      },
      {
        q: "Does it connect to the business's register and accounts?",
        a: "Yes. It is built on the cores of our ERPs: it integrates with the register and point of sale for commissions, tips and staff meals, and with treasury, where each settlement creates its own payable.",
      },
    ],
  },

  forseti: {
    es: [
      {
        q: "¿Cómo maneja Forseti el número de control que pide el SENIAT?",
        a: "Cada factura lleva número de control correlativo, según la Providencia SNAT/2024/000121, sin saltos ni duplicados aunque facturen varias cajas a la vez. Una factura emitida no se edita ni se borra, y se reimprime idéntica sin volver a emitirla.",
      },
      {
        q: "¿Cómo se corrige una factura ya emitida?",
        a: "Solo con nota de crédito o de débito. La nota de crédito exige PIN de supervisor y nunca puede sumar más que la factura; la nota de débito lleva su propio número de control.",
      },
      {
        q: "¿Calcula el IVA y el IGTF?",
        a: "Sí. El IVA de 16 % va desglosado en cada factura, con tasa configurable, y el IGTF de 3 % se aplica solo sobre lo pagado en divisas. Los montos se muestran en dólares y en bolívares a la tasa BCV del día, y la factura indica la forma de pago, incluido el pago mixto.",
      },
      {
        q: "¿Genera el libro de ventas?",
        a: "Sí, mensual, con ventas exentas, base imponible, IVA y estado de cada documento, exportable a Excel, CSV y PDF.",
      },
      {
        q: "¿Cómo recibe el cliente su factura?",
        a: "En ticket térmico de 58 mm, en PDF o por WhatsApp. Además, cada cobro facturado envía su comprobante por correo y SMS.",
      },
      {
        q: "¿Puedo facturar sin usar un punto de venta?",
        a: "Sí. Además de facturar al cobrar en caja, puedes emitir facturas manuales desde el panel y convertir en factura los presupuestos aprobados.",
      },
    ],
    en: [
      {
        q: "How does Forseti handle the control number SENIAT requires?",
        a: "Each invoice carries a sequential control number, per Providencia SNAT/2024/000121, with no gaps or duplicates even when several registers invoice at once. An issued invoice cannot be edited or deleted, and it reprints identically without being issued again.",
      },
      {
        q: "How is an issued invoice corrected?",
        a: "Only with a credit or debit note. A credit note requires a supervisor PIN and can never add up to more than the invoice; a debit note carries its own control number.",
      },
      {
        q: "Does it calculate VAT and IGTF?",
        a: "Yes. The 16% VAT is itemized on every invoice, with a configurable rate, and the 3% IGTF applies only to what was paid in foreign currency. Amounts show in dollars and bolívares at the day's BCV rate, and the invoice states the payment method, including mixed payments.",
      },
      {
        q: "Does it produce the sales ledger?",
        a: "Yes, monthly, with exempt sales, taxable base, VAT and the status of each document, exportable to Excel, CSV and PDF.",
      },
      {
        q: "How does the customer get their invoice?",
        a: "As a 58 mm thermal ticket, a PDF or over WhatsApp. Each invoiced payment also sends its receipt by email and SMS.",
      },
      {
        q: "Can I invoice without a point of sale?",
        a: "Yes. Besides invoicing at checkout, you can issue manual invoices from the panel and turn approved quotes into invoices.",
      },
    ],
  },
};
