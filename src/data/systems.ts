import type { SystemEntry } from "@/types";

/**
 * The OdinCodex systems, in display order. Every capability below traces to
 * the research of the source repositories and the owner's project notes, and
 * only lists what runs in production; nothing here is aspirational.
 * Thor's BioPago support is stated by the owner.
 */
export const systems: SystemEntry[] = [
  {
    id: "valhalla",
    name: "Valhalla ERP",
    stage: "live",
    copy: {
      es: {
        sector: "Restaurantes, bares y clubes",
        summary:
          "Punto de venta y gestión que une caja bimoneda, mesas, cocina, inventario y nómina en un solo sistema con tu marca.",
        highlights: [
          "Caja en dólares y bolívares",
          "Inventario que se descuenta por receta",
          "Comandas por estación a impresoras térmicas",
        ],
        modules: [
          {
            title: "Caja bimoneda y cierre por turno",
            points: [
              "Apertura y cierre de caja por turno y por cajero, con arqueo impreso",
              "Cierre con totales en dólares y bolívares, desglosados por método de pago",
              "Pagos mixtos: efectivo, tarjeta, transferencia, pago móvil y descuento por nómina",
              "Una sola tasa BCV para todo el sistema, corregible solo con PIN",
              "Servicio automático solo cuando atiende un mesonero; el cajero no lo teclea",
            ],
          },
          {
            title: "Mesas, zonas y pedidos",
            points: [
              "Mapa de mesas en tiempo real con su estado y mesonero asignado",
              "Al abrir una mesa se bloquea para que nadie más la tome",
              "Pedidos en mesa, por zona o para llevar, desde la caja o la app",
              "Traspaso de mesa entre mesoneros que reparte propina y comisión según lo acordado",
              "Unir y dividir cuentas, con precuenta impresa o por enlace",
            ],
          },
          {
            title: "Comandas, cocina y barra",
            points: [
              "Cada producto sale por su estación con una comanda separada",
              "Pantallas de estación en el teléfono que se actualizan en vivo",
              "La barra entrega solo escaneando la ficha QR firmada de la orden",
              "Aviso de anulado a cocina y barra cuando se quita un producto",
              "Vista de despacho para gerencia: quién entregó y cuándo",
            ],
          },
          {
            title: "Impresión térmica local",
            points: [
              "Hasta tres impresoras: caja, cocina y barra, con barra repartida por zonas",
              "Imprime factura, precuenta, comanda, ticket de ronda y ficha con QR",
              "Si cae la impresora de una estación, el ticket sale por caja con aviso",
              "Ningún ticket se imprime dos veces, aunque escuchen dos equipos",
              "Servicio de Windows que arranca solo con la PC; también corre en Linux",
            ],
          },
          {
            title: "Recetas, costos y márgenes",
            points: [
              "Recetas por producto con sus insumos, incluidas preparaciones dentro de otras",
              "Costo del plato recalculado al guardar su receta",
              "Costo de mano de obra por plato, aparte del costo de inventario",
              "Cada estación carga sus recetas desde el teléfono, sin tocar precios",
              "Conversión de unidades y alertas de margen en riesgo",
            ],
          },
          {
            title: "Inventario y almacenes",
            points: [
              "Almacenes por área: depósito, cocina y barra",
              "Descuento automático por receta al entregar lo vendido",
              "Movimientos de inventario que no se borran: quién, cuándo y por qué",
              "Conteos físicos a ciegas, con alerta si la diferencia es grande",
              "Mermas con foto obligatoria y traslados entre almacenes",
            ],
          },
          {
            title: "Compras, proveedores y gastos",
            points: [
              "Órdenes de compra con recepción total o parcial de mercancía",
              "Compras desde el teléfono leyendo la factura del proveedor, línea por línea",
              "Historial de precios por lugar, con alerta si varía más de 10 %",
              "Lista de compras semanal según el consumo real, enviada por WhatsApp",
              "Gastos registrados enviando la foto de la factura por Telegram",
            ],
          },
          {
            title: "Cuentas por cobrar",
            points: [
              "Cuenta pendiente que pide el mesonero y la caja autoriza con PIN",
              "Unir varias cuentas de un mismo cliente o separarlas",
              "Abonos parciales hasta saldar la cuenta",
              "Enlace público donde el cliente ve su cuenta y reporta su pago",
              "Avisos de deuda por SMS o, si no hay teléfono, por correo",
            ],
          },
          {
            title: "Pago móvil verificado",
            points: [
              "Confirma referencia y monto de cada pago móvil en la banca en línea",
              "Los pagos que carga el mesonero pasan siempre por verificación en caja",
              "Aviso al mesonero en su teléfono cuando el banco confirma el pago",
              "Alerta si una referencia ya se usó, con quién y cuándo la cargó",
              "Lectura de la foto del comprobante para compararla con lo cargado",
            ],
          },
          {
            title: "Personal, nómina y comisiones",
            points: [
              "Marcaje de entrada y salida con selfie, solo dentro del local",
              "Nómina semanal con comisión, propinas y bonos por producto",
              "La comisión sale solo de órdenes pagadas y nunca se paga dos veces",
              "Préstamos al personal con abonos y consumos descontados de la nómina",
              "Cada mesonero ve en la app sus ventas, propinas y comisiones",
            ],
          },
          {
            title: "Reportes y panel",
            points: [
              "Venta del día por jornada de negocio, no por medianoche",
              "Separa lo facturado, lo cobrado y lo que queda por cobrar",
              "Ventas por método de pago, por mesonero y productos más vendidos",
              "Informe semanal de inventario con margen por producto y plan de compra",
              "Informe semanal en PDF con la nómina y lo que debe quedar en caja",
            ],
          },
          {
            title: "Control y autorizaciones",
            points: [
              "Pantallas y permisos según el rol de cada persona",
              "Quitar un producto ya enviado exige motivo y PIN de gerente",
              "Cortesías y reinicio de mesa solo con PIN, y quedan auditados",
              "El servidor recalcula cada monto; lo que manda el teléfono no cuenta",
              "Historial de cada producto: enviado, entregado o anulado, y por quién",
            ],
          },
          {
            title: "Marca blanca y configuración",
            points: [
              "Nombre, logos, ícono y paleta de colores para tema claro y oscuro",
              "Datos fiscales, servicio, impuesto, propinas y comisiones desde el panel",
              "Vocabulario propio: renombra mesonero, mesa, cocina o barra",
              "Módulos opcionales que se encienden o apagan sin tocar código",
              "Una instalación aislada por cliente, con su dominio y su base de datos",
            ],
          },
        ],
        platforms: [
          "Panel web y POS en el navegador",
          "App Android e iOS por rol",
          "App instalable como PWA",
          "Servicio de impresión para Windows y Linux",
          "Bot de Telegram",
        ],
        integrations: [
          "Tasa oficial BCV con fuente de respaldo",
          "Pago móvil verificado contra el banco",
          "Impresoras térmicas ESC/POS de 58 mm",
          "Notificaciones push en Android e iOS",
          "SMS desde una línea propia",
          "WhatsApp y Telegram",
          "Lectura de facturas y comprobantes",
        ],
        proof: "En producción en Arena Restobar.",
      },
      en: {
        sector: "Restaurants, bars and clubs",
        summary:
          "Point of sale and management that brings dual-currency checkout, tables, kitchen, inventory and payroll into one system under your brand.",
        highlights: [
          "Checkout in dollars and bolívares",
          "Inventory deducted by recipe",
          "Station tickets to thermal printers",
        ],
        modules: [
          {
            title: "Dual-currency checkout and shift close",
            points: [
              "Register opening and closing per shift and per cashier, with printed count",
              "Close totals in dollars and bolívares, broken down by payment method",
              "Mixed payments: cash, card, transfer, mobile payment and payroll deduction",
              "One BCV rate across the system, correctable only with a PIN",
              "Service charge added automatically only when a waiter serves; cashiers never type it",
            ],
          },
          {
            title: "Tables, zones and orders",
            points: [
              "Live table map with each table's status and assigned waiter",
              "Opening a table locks it so no one else takes it",
              "Orders at the table, by zone or to go, from register or app",
              "Table handover between waiters splits tips and commission as agreed",
              "Merge and split bills, with a pre-bill printed or shared by link",
            ],
          },
          {
            title: "Tickets, kitchen and bar",
            points: [
              "Each item goes to its own station on a separate ticket",
              "Station screens on the phone that update live",
              "The bar only serves by scanning the order's signed QR token",
              "Kitchen and bar are told when an item is voided",
              "Dispatch view for management: who delivered and when",
            ],
          },
          {
            title: "Local thermal printing",
            points: [
              "Up to three printers: register, kitchen and bar, with bar split by zone",
              "Prints invoice, pre-bill, station ticket, round ticket and QR token",
              "If a station printer fails, the ticket prints at the register with a warning",
              "No ticket prints twice, even with two computers listening",
              "Windows service that starts with the PC; it also runs on Linux",
            ],
          },
          {
            title: "Recipes, costs and margins",
            points: [
              "Recipes per item with their ingredients, including nested preparations",
              "Dish cost recalculated whenever its recipe is saved",
              "Labor cost per dish, kept apart from inventory cost",
              "Each station loads its recipes from the phone, without touching prices",
              "Unit conversion and alerts for margins at risk",
            ],
          },
          {
            title: "Inventory and warehouses",
            points: [
              "Warehouses by area: storeroom, kitchen and bar",
              "Inventory deducted by recipe when sold items are delivered",
              "Stock movements that cannot be deleted: who, when and why",
              "Blind physical counts, with an alert on large variances",
              "Waste logged with a required photo, and transfers between warehouses",
            ],
          },
          {
            title: "Purchasing, suppliers and expenses",
            points: [
              "Purchase orders with full or partial receipt of goods",
              "Log purchases from the phone by reading the supplier's invoice line by line",
              "Price history by store, with an alert on changes above 10%",
              "Weekly shopping list based on actual usage, sent over WhatsApp",
              "Expenses logged by sending a photo of the invoice on Telegram",
            ],
          },
          {
            title: "Accounts receivable",
            points: [
              "Waiters request a tab; the register authorizes it with a PIN",
              "Merge several bills from one customer, or split them again",
              "Partial payments until the account is settled",
              "Public link where customers see their account and report payment",
              "Debt reminders by SMS or, without a phone number, by email",
            ],
          },
          {
            title: "Verified mobile payments",
            points: [
              "Confirms each mobile payment's reference and amount in online banking",
              "Payments entered by waiters always go through register verification",
              "The waiter's phone is notified when the bank confirms the payment",
              "Alert when a reference was already used, showing who and when",
              "Reads the receipt photo to compare it with what was entered",
            ],
          },
          {
            title: "Staff, payroll and commissions",
            points: [
              "Clock-in and clock-out with a selfie, only on the premises",
              "Weekly payroll with commission, tips and per-product bonuses",
              "Commission comes only from paid orders and is never paid twice",
              "Staff loans with installments and meals deducted from payroll",
              "Every waiter sees their sales, tips and commissions in the app",
            ],
          },
          {
            title: "Reports and dashboard",
            points: [
              "Daily sales by business day, not by midnight",
              "Separates what was invoiced, collected and still receivable",
              "Sales by payment method and by waiter, plus best-selling items",
              "Weekly inventory report with margin per item and a purchase plan",
              "Weekly PDF report with payroll and the expected cash on hand",
            ],
          },
          {
            title: "Controls and authorizations",
            points: [
              "Screens and permissions based on each person's role",
              "Removing an item already sent requires a reason and a manager PIN",
              "Comps and table resets only with a PIN, and they are logged",
              "The server recalculates every amount; the phone's figures do not count",
              "History of each item: sent, delivered or voided, and by whom",
            ],
          },
          {
            title: "White label and settings",
            points: [
              "Name, logos, icon and color palette for light and dark themes",
              "Tax details, service charge, tax, tips and commissions from the panel",
              "Your own vocabulary: rename waiter, table, kitchen or bar",
              "Optional modules switched on or off without touching code",
              "One isolated installation per client, with its own domain and database",
            ],
          },
        ],
        platforms: [
          "Web panel and in-browser POS",
          "Android and iOS app by role",
          "Installable PWA",
          "Print service for Windows and Linux",
          "Telegram bot",
        ],
        integrations: [
          "Official BCV rate with a fallback source",
          "Mobile payments verified against the bank",
          "58 mm ESC/POS thermal printers",
          "Push notifications on Android and iOS",
          "SMS from your own line",
          "WhatsApp and Telegram",
          "Invoice and receipt reading",
        ],
        proof: "In production at Arena Restobar.",
      },
    },
  },
  {
    id: "bifrost",
    name: "Bifrost ERP",
    stage: "live",
    copy: {
      es: {
        sector: "Clubes sociales y deportivos",
        summary:
          "Gestión integral del club: socios y acciones, cuotas, accesos, facturación fiscal y una app para cada perfil.",
        highlights: [
          "Facturación fiscal SENIAT con IVA e IGTF",
          "Acceso con carnet QR y morosidad",
          "App para socios, porteros y deportistas",
        ],
        modules: [
          {
            title: "Socios, acciones y solicitudes",
            points: [
              "Ficha única del socio con su acción, carga familiar, cuotas y pases",
              "Búsqueda por acción, cédula o nombre, sin importar tildes",
              "Historial de dueños de cada acción; el traspaso familiar es inmediato",
              "El traspaso a un tercero se cobra en caja y se analiza como solicitud",
              "Solicitud de ingreso en línea; al aprobarla se crea el socio con su acción",
            ],
          },
          {
            title: "Cuotas y morosidad",
            points: [
              "Cuota mensual por tipo de socio, con el IVA incluido en el precio",
              "Pronto pago que regala pases de invitado del mes",
              "Pago anual adelantado: se pagan 11 meses y se cubren 12",
              "Lista gris: pasada la tolerancia, se bloquean entrada, carnets y pases",
              "Al pagar, el socio queda reactivado solo",
            ],
          },
          {
            title: "Caja y venta rápida",
            points: [
              "Caja por cajero, abierta con la tasa del día y cobro mixto",
              "Arqueo por método en su moneda, con la diferencia a la vista",
              "Otro supervisor concilia el cierre; el faltante va a nómina en cuotas",
              "Entradas, piscina y estacionamiento del día, con un QR por persona",
              "QR de un solo uso, válido ese día y en su puerta",
            ],
          },
          {
            title: "Facturación fiscal SENIAT",
            points: [
              "Facturas inmutables con número de control, sin saltos ni duplicados",
              "Correcciones solo por nota de crédito, con PIN, o de débito",
              "IVA desglosado e IGTF solo sobre lo pagado en divisas",
              "Libro de ventas mensual exportable a Excel y PDF",
              "Reimpresión idéntica, con los datos del emisor congelados",
            ],
          },
          {
            title: "Pagos reportados y conciliados",
            points: [
              "El socio reporta su pago desde la app con comprobante obligatorio",
              "No factura ni levanta la morosidad hasta que se confirma el pago",
              "Conciliación automática contra el banco por referencia y monto",
              "Pago dividido en hasta cinco referencias, con una sola factura",
              "Una referencia nunca se usa dos veces, ni en la app ni en caja",
            ],
          },
          {
            title: "Acceso, carnets e invitados",
            points: [
              "Carnet digital con QR que funciona sin señal en la puerta",
              "El vigilante valida QR o cédula desde la app en cada puerta",
              "Niega la entrada por morosidad, lista negra o carnet vencido",
              "La piscina se abre solo con pase de piscina, no con el carnet",
              "Cupo mensual de invitados por acción, con un QR por invitado",
            ],
          },
          {
            title: "Reservas de instalaciones",
            points: [
              "El socio reserva salón o caney desde la app, sin esperar aprobación",
              "Un caney gratis al año por acción, compartido con la familia",
              "Calendario sin choques de horario, aunque dos personas reserven a la vez",
              "Solo reserva quien está al día; cancelar 24 horas antes devuelve el beneficio",
              "Avisos por correo y SMS al registrar, confirmar o cancelar",
            ],
          },
          {
            title: "Comités deportivos",
            points: [
              "Atletas, categorías, equipos, temporadas, convocatorias y asistencia por comité",
              "Un atleta es una sola ficha aunque practique varios deportes",
              "Cobros del comité con recibo propio, fuera de la caja del club",
              "Torneos, estadísticas por disciplina y tabla de posiciones",
              "Cada comité ve solo a su gente; los datos médicos quedan protegidos",
            ],
          },
          {
            title: "Tesorería, egresos y concesionarios",
            points: [
              "Egresos con su soporte, también con foto desde el teléfono",
              "Aprobación obligatoria sobre un monto; quien registra no puede aprobar",
              "Pagos recurrentes que se generan solos cada mes, trimestre o año",
              "Saldo de cada cuenta: bancos, efectivo en bolívares y dólares, billeteras",
              "Concesionarios con canon en dólares o bolívares y contratos por vencer marcados",
            ],
          },
          {
            title: "Recursos humanos",
            points: [
              "Expediente con contrato, cargo e historial de salario",
              "Marcaje de entrada y salida desde la app, con turnos nocturnos",
              "Vacaciones y permisos desde la app; nadie aprueba los suyos",
              "Prestaciones y liquidaciones según la LOTTT, con simulación previa",
              "CONAPDIS, LOPCYMAT, inamovilidad y declaración al MINTRA",
            ],
          },
          {
            title: "Tablero e informes con IA",
            points: [
              "Cobrado, pagado, por cobrar y disponible, contra el período anterior",
              "Gráfico de 12 meses: lo esperado contra lo cobrado",
              "Preguntas en lenguaje natural respondidas con tabla y resumen, solo lectura",
              "Redacta amonestaciones y suspensiones según el estatuto, exportables a Word",
              "Informes de socios, morosidad, accesos y ventas a PDF, Excel y CSV",
            ],
          },
          {
            title: "Marca blanca, permisos y auditoría",
            points: [
              "Una instalación por club, con su dominio, su base de datos y su app",
              "Nombre, logo, colores, datos fiscales y cuentas de pago desde el panel",
              "Cuotas, pronto pago, morosidad e IGTF se ajustan sin programar",
              "Roles a la medida, con permisos por pantalla que valen al instante",
              "Auditoría de cada cambio: quién, qué y cuándo",
            ],
          },
        ],
        platforms: [
          "Panel web administrativo",
          "Portal público de solicitudes y sitio del club",
          "Portal web para cada comité",
          "App Android e iOS por perfil",
          "App instalable como PWA",
          "Escaneo de QR con la cámara del teléfono",
        ],
        integrations: [
          "Tasa oficial BCV con fuente de respaldo",
          "Facturación SENIAT con IVA e IGTF",
          "Pago móvil conciliado contra el banco",
          "Comprobantes por correo y SMS",
          "Exportación a PDF, Excel y Word",
        ],
      },
      en: {
        sector: "Social and sports clubs",
        summary:
          "End-to-end club management: members and shares, dues, access control, tax invoicing and an app for every profile.",
        highlights: [
          "SENIAT tax invoicing with VAT and IGTF",
          "QR card access tied to dues",
          "App for members, gate staff and athletes",
        ],
        modules: [
          {
            title: "Members, shares and applications",
            points: [
              "Single member record with share, dependents, dues and passes",
              "Search by share, ID number or name, accents ignored",
              "Ownership history of each share; family transfers take effect immediately",
              "Transfers to third parties are charged at the register and reviewed as requests",
              "Online membership application; approval creates the member with a share",
            ],
          },
          {
            title: "Dues and delinquency",
            points: [
              "Monthly dues by member type, with VAT included in the price",
              "Early payment that grants guest passes for the month",
              "Annual prepayment: pay 11 months and get 12 covered",
              "Grey list: after the grace period, entry, cards and passes are blocked",
              "Once paid, the member is reactivated automatically",
            ],
          },
          {
            title: "Register and quick sale",
            points: [
              "Register per cashier, opened at the daily rate, with mixed payments",
              "Count by payment method in its own currency, with live variance",
              "Another supervisor reconciles the close; shortfalls go to payroll in installments",
              "Same-day entry, pool and parking passes, one QR per person",
              "Single-use QR, valid that day and at its own gate",
            ],
          },
          {
            title: "SENIAT tax invoicing",
            points: [
              "Immutable invoices with control numbers, no gaps and no duplicates",
              "Corrections only by credit note, with a PIN, or by debit note",
              "VAT itemized, and IGTF only on the portion paid in foreign currency",
              "Monthly sales ledger exportable to Excel and PDF",
              "Identical reprints, with issuer details frozen in each invoice",
            ],
          },
          {
            title: "Reported and reconciled payments",
            points: [
              "Members report payments from the app with a required receipt",
              "No invoice and no reinstatement until the payment is confirmed",
              "Automatic reconciliation against the bank by reference and amount",
              "Split payment across up to five references, with a single invoice",
              "A reference is never used twice, in the app or at the register",
            ],
          },
          {
            title: "Access, cards and guests",
            points: [
              "Digital QR card that works at the gate without signal",
              "Gate staff check QR or ID number from the app at every gate",
              "Entry denied for overdue dues, blacklist or expired card",
              "The pool opens only with a pool pass, not with the card",
              "Monthly guest allowance per share, one QR per guest",
            ],
          },
          {
            title: "Facility bookings",
            points: [
              "Members book halls or party areas from the app, no approval needed",
              "One free party area per share each year, shared with family",
              "No double bookings, even when two people book at once",
              "Only members current on dues book; 24-hour cancellation restores the benefit",
              "Email and SMS notices when booked, confirmed or cancelled",
            ],
          },
          {
            title: "Sports committees",
            points: [
              "Athletes, categories, teams, seasons, call-ups and attendance per committee",
              "One record per athlete, even across several sports",
              "Committee fees with their own receipt, outside the club's register",
              "Tournaments, stats by discipline and standings",
              "Each committee sees only its people; medical data stays protected",
            ],
          },
          {
            title: "Treasury, expenses and concessions",
            points: [
              "Expenses with supporting documents, including a photo from the phone",
              "Approval required above a set amount; whoever records it cannot approve",
              "Recurring payments generated automatically each month, quarter or year",
              "Balance of every account: banks, cash in bolívares and dollars, wallets",
              "Concessions with rent in dollars or bolívares and expiring contracts flagged",
            ],
          },
          {
            title: "Human resources",
            points: [
              "Employee file with contract, position and salary history",
              "Clock-in and clock-out from the app, night shifts included",
              "Vacations and leave requested in the app; nobody approves their own",
              "Severance and settlements under LOTTT, with a prior simulation",
              "CONAPDIS, LOPCYMAT, job protection and MINTRA filings",
            ],
          },
          {
            title: "Dashboard and AI reports",
            points: [
              "Collected, paid, receivable and available, against the previous period",
              "12-month chart of expected versus collected",
              "Plain-language questions answered with a table and summary, read-only",
              "Drafts warnings and suspensions under the club bylaws, exportable to Word",
              "Reports on members, delinquency, access and sales to PDF, Excel and CSV",
            ],
          },
          {
            title: "White label, permissions and audit",
            points: [
              "One installation per club, with its own domain, database and app",
              "Name, logo, colors, tax details and payment accounts from the panel",
              "Dues, early payment, delinquency and IGTF adjusted without programming",
              "Custom roles with per-screen permissions that apply instantly",
              "Audit of every change: who, what and when",
            ],
          },
        ],
        platforms: [
          "Admin web panel",
          "Public application portal and club website",
          "Web portal for each committee",
          "Android and iOS app by profile",
          "Installable PWA",
          "QR scanning with the phone camera",
        ],
        integrations: [
          "Official BCV rate with a fallback source",
          "SENIAT invoicing with VAT and IGTF",
          "Mobile payments reconciled against the bank",
          "Receipts by email and SMS",
          "Export to PDF, Excel and Word",
        ],
      },
    },
  },
  {
    id: "heimdall",
    name: "Heimdall",
    stage: "live",
    copy: {
      es: {
        sector: "Restaurantes y clubes que cobran con pago móvil",
        summary:
          "Confirma cada pago móvil directamente en la banca en línea del negocio, sin que nadie tenga que entrar al banco a revisar.",
        highlights: [
          "Pago móvil confirmado contra el banco",
          "Monto exacto al céntimo",
          "Alerta de referencias repetidas",
        ],
        modules: [
          {
            title: "Verificación automática contra el banco",
            points: [
              "Cada pago registrado se consulta solo en la banca en línea",
              "Agrupa los pagos en una sola consulta para no bloquear la cuenta",
              "Exige el monto en bolívares exacto al céntimo y dice cuánto falta",
              "Si el banco no responde, reintenta solo y retoma lo pendiente",
              "Con el pago verificado puede cerrar la cuenta, facturar y liberar la mesa",
            ],
          },
          {
            title: "Pantalla de verificación para caja",
            points: [
              "Pagos por verificar ordenados por urgencia, con un veredicto claro",
              "Compara lo tecleado, la foto del comprobante y lo que dice el banco",
              "Aprobación uno por uno o por lote",
              "Aprobar un pago dudoso exige PIN de gerente y un motivo",
            ],
          },
          {
            title: "Lectura del comprobante",
            points: [
              "El mesonero o el cajero toma la foto del comprobante con el teléfono",
              "El sistema revisa si la referencia y el monto aparecen en la foto",
              "Si no pudo leer la imagen lo dice, en vez de darla por buena",
            ],
          },
          {
            title: "Control de referencias",
            points: [
              "Avisa si una referencia ya se usó: quién la cargó, cuándo y por cuánto",
              "Detecta un mismo movimiento del banco usado para pagar dos órdenes",
              "Una referencia nunca se cobra dos veces",
            ],
          },
          {
            title: "Pagos reportados por socios",
            points: [
              "Los socios reportan su pago móvil desde la app o en la caja",
              "Una compra pagada con hasta cinco transferencias se cobra una sola vez",
              "Si el monto no coincide, rechaza con el motivo y guarda lo recibido",
              "Al conciliar emite la factura y avisa por correo o SMS",
            ],
          },
          {
            title: "Saldo y avisos del banco",
            points: [
              "Saldo de la cuenta bajo pedido en el grupo de Telegram del negocio",
              "Aviso por SMS y correo cuando abre la subasta de divisas del banco",
            ],
          },
        ],
        platforms: [
          "Pantalla web de verificación",
          "App Android para mesoneros y cajeros",
          "App del socio",
          "Bot de Telegram",
        ],
        integrations: [
          "Banca en línea del negocio",
          "Pago móvil",
          "Tasa oficial BCV",
          "Lectura de comprobantes",
          "Avisos en tiempo real al POS",
          "SMS desde una línea propia",
        ],
      },
      en: {
        sector: "Restaurants and clubs that take mobile payments",
        summary:
          "Confirms every mobile payment directly in the business's online banking, so nobody has to log in to the bank to check.",
        highlights: [
          "Mobile payments confirmed against the bank",
          "Amount matched to the cent",
          "Alerts on repeated references",
        ],
        modules: [
          {
            title: "Automatic bank verification",
            points: [
              "Every recorded payment is checked automatically in online banking",
              "Batches payments into a single check so the account is never locked",
              "Requires the bolívar amount exact to the cent and states the gap",
              "If the bank does not respond, it retries and resumes pending checks",
              "Once verified, it can close the bill, invoice and free the table",
            ],
          },
          {
            title: "Verification screen for the register",
            points: [
              "Payments to verify sorted by urgency, each with a clear verdict",
              "Compares what was typed, the receipt photo and the bank record",
              "Approve one by one or in batches",
              "Approving a doubtful payment requires a manager PIN and a reason",
            ],
          },
          {
            title: "Receipt reading",
            points: [
              "The waiter or cashier photographs the receipt with the phone",
              "The system checks whether reference and amount appear in the photo",
              "If it cannot read the image it says so instead of accepting it",
            ],
          },
          {
            title: "Reference control",
            points: [
              "Warns when a reference was already used: who, when and how much",
              "Detects one bank movement used to pay two different orders",
              "A reference is never charged twice",
            ],
          },
          {
            title: "Member-reported payments",
            points: [
              "Members report their mobile payment from the app or at the register",
              "A purchase paid with up to five transfers is charged only once",
              "If the amount differs, it declines with the reason and keeps what arrived",
              "On reconciliation it issues the invoice and notifies by email or SMS",
            ],
          },
          {
            title: "Bank balance and alerts",
            points: [
              "Account balance on request in the business's Telegram group",
              "SMS and email alert when the bank's currency auction opens",
            ],
          },
        ],
        platforms: [
          "Web verification screen",
          "Android app for waiters and cashiers",
          "Member app",
          "Telegram bot",
        ],
        integrations: [
          "The business's online banking",
          "Mobile payments",
          "Official BCV rate",
          "Receipt reading",
          "Real-time updates to the POS",
          "SMS from your own line",
        ],
      },
    },
  },
  {
    id: "thor",
    name: "Thor",
    stage: "live",
    copy: {
      es: {
        sector: "Clubes y negocios de atención al público",
        summary:
          "Kiosco de autoservicio donde la persona se identifica, elige, paga y recibe su pase con QR sin pasar por la caja.",
        highlights: [
          "Autopago con pago móvil y BioPago",
          "Pase con QR al instante",
          "Equipo bloqueado con PIN de supervisor",
        ],
        modules: [
          {
            title: "Equipo en modo kiosco",
            points: [
              "Pantalla táctil sin menú ni acceso al panel administrativo",
              "Para salir del modo kiosco hace falta el PIN de un supervisor",
              "Vuelve solo al inicio si nadie lo usa durante un rato",
              "Teclado numérico grande, pensado para usarse de pie",
            ],
          },
          {
            title: "Identificación",
            points: [
              "La persona se identifica con su cédula",
              "El socio ve su precio; el no socio deja nombre y teléfono",
              "El socio entra con un código de 6 dígitos que recibe por SMS",
              "Como la pantalla es pública, nunca muestra teléfono, deuda ni foto",
            ],
          },
          {
            title: "Catálogo y precios",
            points: [
              "Accesos y productos con precio en dólares e IVA desglosado",
              "Monto exacto en bolívares a la tasa del día",
              "Precio distinto para socio y para quien no lo es",
              "Catálogo y precios se administran desde la caja del negocio",
            ],
          },
          {
            title: "Cobro",
            points: [
              "Pago móvil confirmado automáticamente contra el banco",
              "Pago con BioPago",
              "Tocar dos veces no cobra dos veces",
              "Cada equipo admite como máximo cinco pagos esperando al banco",
            ],
          },
          {
            title: "Entrega del pase",
            points: [
              "Con el pago confirmado muestra el pase con QR y la factura",
              "El pase también llega por SMS, aunque la persona ya se haya ido",
              "Código para reclamar en la caja mientras se espera al banco",
            ],
          },
          {
            title: "Autogestión del socio",
            points: [
              "Pagar la cuota del mes desde el kiosco",
              "Reservar caney o salón con pago incluido",
              "Consultar sus invitados y su pase de piscina",
            ],
          },
        ],
        platforms: ["Pantalla táctil en modo kiosco", "Cualquier equipo con navegador"],
        integrations: [
          "Pago móvil verificado contra el banco",
          "BioPago",
          "Tasa oficial BCV",
          "Pases y facturas por SMS",
        ],
      },
      en: {
        sector: "Clubs and walk-in businesses",
        summary:
          "Self-service kiosk where people identify themselves, choose, pay and get a QR pass without going through the register.",
        highlights: [
          "Self-checkout with mobile payment and BioPago",
          "Instant QR pass",
          "Device locked behind a supervisor PIN",
        ],
        modules: [
          {
            title: "Kiosk-mode device",
            points: [
              "Touch screen with no menu and no access to the admin panel",
              "Leaving kiosk mode requires a supervisor's PIN",
              "Returns to the start screen when left idle",
              "Large numeric keypad, designed for standing use",
            ],
          },
          {
            title: "Identification",
            points: [
              "People identify themselves with their ID number",
              "Members see their price; non-members enter name and phone",
              "Members sign in with a 6-digit code sent by SMS",
              "Because the screen is public, it never shows phone, debt or photo",
            ],
          },
          {
            title: "Catalog and pricing",
            points: [
              "Passes and products priced in dollars with VAT itemized",
              "Exact bolívar amount at the daily rate",
              "Separate prices for members and non-members",
              "Catalog and prices managed from the business's register",
            ],
          },
          {
            title: "Payment",
            points: [
              "Mobile payment confirmed automatically against the bank",
              "Payment with BioPago",
              "A double tap never charges twice",
              "Each device allows at most five payments awaiting the bank",
            ],
          },
          {
            title: "Pass delivery",
            points: [
              "Once paid, it shows the QR pass and the invoice on screen",
              "The pass also arrives by SMS, even if the person has left",
              "A claim code for the register while the bank confirms",
            ],
          },
          {
            title: "Member self-service",
            points: [
              "Pay the monthly dues from the kiosk",
              "Book a hall or party area with payment included",
              "Check guests and pool pass",
            ],
          },
        ],
        platforms: ["Touch screen in kiosk mode", "Any device with a browser"],
        integrations: [
          "Mobile payments verified against the bank",
          "BioPago",
          "Official BCV rate",
          "Passes and invoices by SMS",
        ],
      },
    },
  },
  {
    id: "asgard",
    name: "Asgard",
    stage: "live",
    copy: {
      es: {
        sector: "Recursos humanos para cualquier operación",
        summary:
          "Recursos humanos construido sobre los núcleos de nuestros ERP: asistencia, nómina con comisiones, vacaciones, liquidaciones y cumplimiento de la ley laboral venezolana.",
        highlights: [
          "Marcaje con selfie y geocerca",
          "Prestaciones y liquidaciones según la LOTTT",
          "Nómina con comisiones, propinas y préstamos",
        ],
        modules: [
          {
            title: "Expediente del personal",
            points: [
              "Expediente con contrato, cargo, departamento e historial de salario",
              "Departamentos y cargos con el personal de cada uno",
              "Seguro social, discapacidad y fueros de inamovilidad en cada ficha",
              "Egreso registrado con su fecha y su causal",
              "Usuario del sistema vinculado a la ficha de cada empleado",
            ],
          },
          {
            title: "Asistencia",
            points: [
              "Marcaje de entrada y salida desde la app con selfie",
              "Solo se marca dentro del perímetro del local, verificado por ubicación",
              "Hora del servidor, turnos nocturnos y sin marcas duplicadas",
              "Hora de entrada con minutos de tolerancia antes de contar como tarde",
              "Horas extra y nocturnas contadas por empleado",
            ],
          },
          {
            title: "Nómina, comisiones y propinas",
            points: [
              "Nómina semanal: días, comisiones, propinas y bonos, menos descuentos",
              "Comisión configurable sobre ventas o servicio, solo de órdenes pagadas",
              "En mesas traspasadas, comisión y propina se reparten según lo acordado",
              "Bono por producto vendido, precargado en la nómina",
              "Foto del comprobante de cada pago y registro de quién liquidó",
            ],
          },
          {
            title: "Préstamos y descuentos",
            points: [
              "Préstamos en dólares a la tasa del día del préstamo",
              "Abonos completos o parciales descontados de la nómina semanal",
              "Historial de abonos y saldo pendiente de cada préstamo",
              "Consumos del personal cobrados por nómina, sin pasar por caja",
              "Faltante de caja cargado al cajero en cuotas, ligado a su cierre",
            ],
          },
          {
            title: "Vacaciones y permisos",
            points: [
              "El empleado pide permisos y vacaciones desde la app",
              "Otra persona aprueba: nadie aprueba lo suyo, ni el administrador",
              "Días de vacaciones y bono vacacional calculados según la LOTTT",
              "Avisa si se piden más días de los disponibles y evita solapes",
            ],
          },
          {
            title: "Prestaciones y liquidaciones",
            points: [
              "Depósito trimestral de prestaciones y días adicionales por antigüedad",
              "Liquidación calculada a la fecha de egreso, aunque se pague después",
              "Simulación de la liquidación de cualquier empleado, sin guardar nada",
              "Paga lo mayor entre lo depositado y el cálculo retroactivo",
              "Cada liquidación crea sola su cuenta por pagar en tesorería",
            ],
          },
          {
            title: "Cumplimiento legal",
            points: [
              "Cuota de 5 % de trabajadores con discapacidad y reporte CONAPDIS",
              "Inamovilidad validada antes de un despido: decreto, embarazo, paternidad o fuero",
              "LOPCYMAT: delegados, comité de seguridad, notificación de riesgos y exámenes",
              "Declaración al MINTRA y cálculo de la contribución de pensiones",
            ],
          },
        ],
        platforms: ["Panel web", "App Android e iOS del empleado", "App instalable como PWA"],
        integrations: [
          "Caja y punto de venta del ERP",
          "Tesorería y egresos",
          "Cámara y ubicación del teléfono",
          "Ley laboral venezolana: LOTTT y LOPCYMAT",
        ],
      },
      en: {
        sector: "Human resources for any operation",
        summary:
          "Human resources built on the cores of our ERPs: attendance, payroll with commissions, vacations, settlements and compliance with Venezuelan labor law.",
        highlights: [
          "Clock-in with selfie and geofence",
          "Severance and settlements under LOTTT",
          "Payroll with commissions, tips and loans",
        ],
        modules: [
          {
            title: "Staff records",
            points: [
              "Employee file with contract, position, department and salary history",
              "Departments and positions with their headcount",
              "Social security, disability and job protection recorded in each file",
              "Terminations recorded with their date and legal cause",
              "System user linked to each employee's file",
            ],
          },
          {
            title: "Attendance",
            points: [
              "Clock-in and clock-out from the app with a selfie",
              "Clock-in only works on the premises, checked by location",
              "Server time, night shifts and no duplicate punches",
              "Start time with grace minutes before it counts as late",
              "Overtime and night hours counted per employee",
            ],
          },
          {
            title: "Payroll, commissions and tips",
            points: [
              "Weekly payroll: days, commissions, tips and bonuses, minus deductions",
              "Configurable commission on sales or service, only from paid orders",
              "On transferred tables, commission and tips are split as agreed",
              "Per-product sales bonus, preloaded into payroll",
              "Transfer receipt photo for every payment, and who settled payroll",
            ],
          },
          {
            title: "Loans and deductions",
            points: [
              "Dollar loans at the exchange rate of the loan date",
              "Full or partial installments deducted from weekly payroll",
              "Installment history and outstanding balance for each loan",
              "Staff meals charged through payroll, without going through the register",
              "Register shortfalls charged to the cashier in installments, linked to the close",
            ],
          },
          {
            title: "Vacations and leave",
            points: [
              "Employees request leave and vacations from the app",
              "Someone else approves: nobody approves their own, not even an admin",
              "Vacation days and vacation bonus calculated under LOTTT",
              "Warns when more days are requested than available, and prevents overlaps",
            ],
          },
          {
            title: "Severance and settlements",
            points: [
              "Quarterly severance deposits and extra days for seniority",
              "Settlement calculated at the exit date, even if paid later",
              "Settlement simulation for any employee, without saving anything",
              "Pays the higher of deposits or the retroactive calculation",
              "Each settlement creates its own payable in treasury",
            ],
          },
          {
            title: "Legal compliance",
            points: [
              "5% quota of workers with disabilities and CONAPDIS report",
              "Job protection checked before a dismissal: decree, pregnancy, paternity or union",
              "LOPCYMAT: prevention delegates, safety committee, risk notices and medical exams",
              "MINTRA filing and pension contribution calculation",
            ],
          },
        ],
        platforms: ["Web panel", "Android and iOS employee app", "Installable PWA"],
        integrations: [
          "The ERP's register and point of sale",
          "Treasury and expenses",
          "Phone camera and location",
          "Venezuelan labor law: LOTTT and LOPCYMAT",
        ],
      },
    },
  },
  {
    id: "forseti",
    name: "Forseti",
    stage: "live",
    copy: {
      es: {
        sector: "Facturación para negocios en Venezuela",
        summary:
          "Facturación construida sobre los núcleos de nuestros ERP, con documentos fiscales inmutables, notas de crédito y libro de ventas.",
        highlights: [
          "Número de control correlativo e inmutable",
          "IVA e IGTF configurables",
          "Libro de ventas mensual",
        ],
        modules: [
          {
            title: "Documentos fiscales",
            points: [
              "Facturas con número de control correlativo, según la Providencia SNAT/2024/000121",
              "Sin saltos ni duplicados, aunque facturen varias cajas a la vez",
              "Una factura emitida no se edita ni se borra",
              "Datos del emisor congelados para reimprimirla idéntica, sin volver a emitirla",
              "Un doble clic nunca genera dos facturas del mismo cobro",
            ],
          },
          {
            title: "Notas de crédito y débito",
            points: [
              "Correcciones solo con nota de crédito o de débito",
              "La nota de crédito exige PIN de supervisor",
              "Las notas de crédito nunca suman más que la factura",
              "Una nota de crédito total devuelve las cuotas a pendientes",
              "Nota de débito con su propio número de control",
            ],
          },
          {
            title: "Impuestos y monedas",
            points: [
              "IVA 16 % desglosado en cada factura, con tasa configurable",
              "IGTF 3 % solo sobre lo pagado en divisas",
              "Montos en dólares y bolívares a la tasa BCV del día",
              "Forma de pago en la factura, incluido el pago mixto",
            ],
          },
          {
            title: "Emisión desde la operación",
            points: [
              "Factura emitida al cobrar en caja; si falla, el cobro sigue",
              "Caja y portal del socio facturan con el mismo proceso",
              "Presupuestos aprobados que se convierten en factura",
              "Factura manual desde el panel cuando hace falta",
              "Cánones de arriendo facturados con el RIF del arrendatario",
            ],
          },
          {
            title: "Factura del punto de venta",
            points: [
              "Datos fiscales del cliente: RIF o cédula, dirección y teléfono",
              "Servicio, propina, descuento y datos del pago: referencia, tasa y bolívares",
              "Factura en cero por cortesía total, autorizada con PIN",
              "Ticket térmico de 58 mm, PDF o envío por WhatsApp",
            ],
          },
          {
            title: "Libros y comprobantes",
            points: [
              "Libro de ventas mensual: exentas, base imponible, IVA y estado",
              "Exportación a Excel, CSV y PDF",
              "Comprobante por correo y SMS de cada cobro facturado",
              "Búsqueda de facturas por número o por orden",
            ],
          },
        ],
        platforms: ["Panel web", "PDF e impresión desde el navegador", "Ticket térmico de 58 mm"],
        integrations: [
          "Normativa SENIAT",
          "Tasa oficial BCV",
          "Caja y punto de venta del ERP",
          "Correo, SMS y WhatsApp",
        ],
      },
      en: {
        sector: "Invoicing for businesses in Venezuela",
        summary:
          "Invoicing built on the cores of our ERPs, with immutable tax documents, credit notes and a sales ledger.",
        highlights: [
          "Sequential, immutable control numbers",
          "Configurable VAT and IGTF",
          "Monthly sales ledger",
        ],
        modules: [
          {
            title: "Tax documents",
            points: [
              "Invoices with sequential control numbers, per SENIAT Providencia SNAT/2024/000121",
              "No gaps or duplicates, even with several registers invoicing at once",
              "An issued invoice cannot be edited or deleted",
              "Issuer details frozen for identical reprints, without reissuing",
              "A double click never produces two invoices for one payment",
            ],
          },
          {
            title: "Credit and debit notes",
            points: [
              "Corrections only through credit or debit notes",
              "Credit notes require a supervisor PIN",
              "Credit notes never add up to more than the invoice",
              "A full credit note returns the dues to pending",
              "Debit notes with their own control number",
            ],
          },
          {
            title: "Taxes and currencies",
            points: [
              "16% VAT itemized on every invoice, with a configurable rate",
              "3% IGTF only on the portion paid in foreign currency",
              "Amounts in dollars and bolívares at the daily BCV rate",
              "Payment method on the invoice, including mixed payments",
            ],
          },
          {
            title: "Issued from operations",
            points: [
              "Invoice issued at checkout; if it fails, the payment still goes through",
              "Register and member portal invoice through the same process",
              "Approved quotes that turn into invoices",
              "Manual invoices from the panel when needed",
              "Rent invoiced with the tenant's tax ID",
            ],
          },
          {
            title: "Point-of-sale invoice",
            points: [
              "Customer tax details: tax ID or ID number, address and phone",
              "Service charge, tip, discount and payment data: reference, rate and bolívares",
              "Zero-amount invoice for a full comp, authorized with a PIN",
              "58 mm thermal ticket, PDF or sent over WhatsApp",
            ],
          },
          {
            title: "Ledgers and receipts",
            points: [
              "Monthly sales ledger: exempt sales, tax base, VAT and status",
              "Export to Excel, CSV and PDF",
              "Receipt by email and SMS for every invoiced payment",
              "Invoice search by number or by order",
            ],
          },
        ],
        platforms: ["Web panel", "PDF and browser printing", "58 mm thermal ticket"],
        integrations: [
          "SENIAT regulations",
          "Official BCV rate",
          "The ERP's register and point of sale",
          "Email, SMS and WhatsApp",
        ],
      },
    },
  },
  {
    id: "sleipnir",
    name: "Sleipnir",
    stage: "workshop",
    copy: {
      es: {
        sector: "Compraventa de vehículos",
        summary:
          "Plataforma de compraventa de vehículos para particulares y concesionarios, con verificación de identidad de quien publica.",
        highlights: [],
        modules: [],
        platforms: [],
        integrations: [],
      },
      en: {
        sector: "Vehicle sales",
        summary:
          "Vehicle marketplace for private sellers and dealerships, with identity verification for everyone who lists.",
        highlights: [],
        modules: [],
        platforms: [],
        integrations: [],
      },
    },
  },
  {
    id: "midgard",
    name: "Midgard",
    stage: "workshop",
    copy: {
      es: {
        sector: "Venta inmobiliaria",
        summary: "Sistema para gestionar la venta de inmuebles, hoy en desarrollo en nuestro taller.",
        highlights: [],
        modules: [],
        platforms: [],
        integrations: [],
      },
      en: {
        sector: "Real estate sales",
        summary: "A system to manage property sales, currently in development in our workshop.",
        highlights: [],
        modules: [],
        platforms: [],
        integrations: [],
      },
    },
  },
];
