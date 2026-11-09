import type { SystemId } from "@/types";

/**
 * Practical guides for business owners in Venezuela (Spanish only).
 * Each guide answers a real search with steps and illustrative examples, then
 * points to the system that solves it. Rules for this file:
 * - Legal and tax facts are phrased conservatively and backed by `sources`.
 * - Product claims mirror src/data/systems.ts; nothing here is invented.
 * - Example figures are illustrative and always labelled "Ejemplo".
 */

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  /** Illustrative calculation: label/value rows, optional closing line. */
  | { type: "example"; title: string; rows: [string, string][]; note?: string }
  /** Highlighted aside: a caution or a key takeaway. */
  | { type: "note"; text: string };

export interface GuideSection {
  /** Stable anchor id for the table of contents. */
  id: string;
  heading: string;
  blocks: GuideBlock[];
}

export interface GuideSource {
  label: string;
  url: string;
}

export interface Guide {
  slug: string;
  /** The H1. */
  title: string;
  /** Search title, keyword first; the layout appends "| OdinCodex". */
  seoTitle: string;
  /** Meta description, ≤ 160 characters. */
  description: string;
  /** One or two sentences for the guides index. */
  summary: string;
  /** ISO date. */
  published: string;
  /** Systems that solve what the guide describes, most relevant first. */
  systems: SystemId[];
  /** Shows the "not legal or accounting advice" note. */
  legal?: boolean;
  intro: string[];
  sections: GuideSection[];
  sources?: GuideSource[];
}

export const GUIDES_PUBLISHED = "2026-11-09";

export const guides: Guide[] = [
  {
    slug: "verificar-pago-movil-automaticamente",
    title: "Cómo verificar pagos móviles automáticamente en tu negocio",
    seoTitle: "Cómo verificar pagos móviles automáticamente en tu negocio",
    description:
      "Por qué un capture no prueba un pago, qué revisar en cada pago móvil y cómo verificar contra el banco de forma automática para no entregar sin cobrar.",
    summary:
      "Qué revisar en cada pago móvil, por qué el comprobante en pantalla no basta y cómo automatizar la verificación contra la banca en línea.",
    published: GUIDES_PUBLISHED,
    systems: ["heimdall", "thor", "valhalla"],
    intro: [
      "En Venezuela buena parte de las ventas se cobra por pago móvil. Es rápido para el cliente, pero deja al negocio con una pregunta en cada cobro: ¿el dinero entró de verdad a la cuenta?",
      "Lo habitual es que el cliente muestre el comprobante en su teléfono, el cajero lo mire y entregue. Al cierre, cuando alguien revisa la banca en línea, aparecen las diferencias. Esta guía explica qué revisar en cada pago y cómo hacer que esa revisión ocurra sola, contra el banco, antes de entregar.",
    ],
    sections: [
      {
        id: "comprobante-no-basta",
        heading: "Por qué un comprobante en pantalla no basta",
        blocks: [
          {
            type: "p",
            text: "Un comprobante es una imagen. Puede ser real y aun así no corresponder a tu cobro. Los casos más comunes no requieren mala fe elaborada:",
          },
          {
            type: "list",
            items: [
              "El pago se hizo a otra cuenta o a otro teléfono por un error de dígito.",
              "El monto es menor al de la cuenta: faltan unos bolívares o unos céntimos.",
              "La referencia es de un pago anterior, a veces de otro día, que ya se usó en tu negocio.",
              "El comprobante fue editado o es de otra persona.",
              "El pago todavía no se refleja en la cuenta y nadie lo vuelve a revisar.",
            ],
          },
          {
            type: "p",
            text: "La única prueba de un pago es el movimiento en la banca en línea del negocio. Todo lo demás es una pista para encontrarlo.",
          },
        ],
      },
      {
        id: "que-revisar",
        heading: "Qué revisar en cada pago móvil",
        blocks: [
          {
            type: "p",
            text: "Antes de cerrar una cuenta, el pago debería pasar estos controles, en este orden:",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Que exista un movimiento en la cuenta del negocio con esa referencia.",
              "Que el monto en bolívares sea exacto, al céntimo, o que se sepa cuánto falta.",
              "Que la fecha del movimiento corresponda al cobro y no a un día anterior.",
              "Que esa referencia no se haya usado antes para pagar otra orden en tu negocio.",
              "Que el comprobante que mostró el cliente diga lo mismo que el banco.",
            ],
          },
          {
            type: "note",
            text: "El cuarto control es el que más se olvida. Un movimiento real del banco puede presentarse dos veces, en dos mesas o en dos días distintos. Si nadie lleva registro de las referencias usadas, ambas cuentas se dan por pagadas.",
          },
        ],
      },
      {
        id: "a-mano",
        heading: "Por qué la revisión a mano falla en hora pico",
        blocks: [
          {
            type: "p",
            text: "Revisar a mano significa que alguien con acceso a la banca en línea busca cada pago. Funciona con pocos cobros, pero en un turno lleno aparecen tres problemas: la persona con la clave del banco se convierte en un cuello de botella, la sesión del banco expira o se bloquea por demasiadas consultas, y la presión por atender hace que se acepten comprobantes sin revisar.",
          },
          {
            type: "p",
            text: "Además, la clave del banco queda en manos de quien revisa. Muchos dueños prefieren no compartirla y terminan revisando ellos mismos al final del día, cuando el cliente ya se fue.",
          },
        ],
      },
      {
        id: "ejemplo-referencia",
        heading: "Un caso típico: la referencia repetida",
        blocks: [
          {
            type: "example",
            title: "Ejemplo",
            rows: [
              ["Lunes, mesa 4", "Paga Bs 1.850,00 con la referencia 004512"],
              ["Martes, mesa 9", "Muestra un comprobante con la misma referencia 004512"],
              ["Revisión a mano", "El cajero busca la referencia en el banco, la encuentra y la da por buena"],
              ["Resultado", "Un solo pago cubrió dos cuentas"],
            ],
            note: "La referencia existe y el monto coincide; lo único que la delata es que ya se había usado. Solo un registro de referencias usadas lo detecta.",
          },
        ],
      },
      {
        id: "verificacion-automatica",
        heading: "Cómo funciona la verificación automática",
        blocks: [
          {
            type: "p",
            text: "Automatizar no es quitar el control al cajero, es darle una respuesta del banco en segundos. El flujo, de principio a fin, es este:",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "El cajero o el mesonero registra la referencia y el monto, y toma una foto del comprobante.",
              "El sistema consulta la banca en línea del negocio. Agrupa las consultas para no bloquear la cuenta.",
              "Compara el monto exacto y, si no alcanza, dice cuánto falta.",
              "Revisa que la referencia no se haya usado antes y, si se usó, muestra quién la cargó y cuándo.",
              "Con el pago verificado, la cuenta se cierra, se factura y la mesa queda libre.",
              "Si el banco no responde, el sistema reintenta solo y retoma lo pendiente.",
            ],
          },
          {
            type: "p",
            text: "Así nadie más necesita la clave del banco, y la caja deja de depender de que una persona esté disponible para revisar.",
          },
        ],
      },
      {
        id: "pago-no-aparece",
        heading: "Qué hacer cuando el pago no aparece",
        blocks: [
          {
            type: "list",
            items: [
              "No entregues todavía. Un pago que no aparece no es un pago rechazado, pero tampoco uno confirmado.",
              "Pide al cliente que revise en su app el teléfono y el banco de destino.",
              "Deja que el sistema vuelva a consultar: a veces el banco tarda en reflejar el movimiento.",
              "Si hay que aceptar un pago dudoso, que lo apruebe un gerente con su PIN y deje el motivo escrito.",
            ],
          },
          {
            type: "p",
            text: "Lo importante es que la excepción quede registrada. Un pago aprobado sin verificar debería ser una decisión con nombre y motivo, no algo que pasó en medio del apuro.",
          },
        ],
      },
      {
        id: "autopago",
        heading: "Cuando el cliente paga solo: autopago",
        blocks: [
          {
            type: "p",
            text: "En clubes y negocios con filas, el siguiente paso es que el cliente pague sin pasar por la caja. Un kiosco de autopago identifica a la persona, le muestra el monto exacto en bolívares a la tasa del día, recibe el pago móvil o BioPago y entrega el pase con QR solo cuando el banco confirma. La misma verificación, sin cajero de por medio.",
          },
        ],
      },
      {
        id: "como-lo-resolvemos",
        heading: "Cómo lo resolvemos en OdinCodex",
        blocks: [
          {
            type: "p",
            text: "Heimdall confirma cada pago móvil directamente en la banca en línea del negocio: exige el monto exacto al céntimo, alerta las referencias repetidas, lee la foto del comprobante y ofrece una pantalla de verificación para la caja donde aprobar un pago dudoso exige PIN de gerente y un motivo. Thor lleva esa verificación a un kiosco de autopago, y Valhalla ERP la integra en el punto de venta para restaurantes.",
          },
        ],
      },
    ],
  },

  {
    slug: "facturacion-seniat-normativa-vigente",
    title: "Facturación SENIAT: qué exige la normativa y qué cambió en 2026",
    seoTitle: "Facturación SENIAT en 2026: qué exige la normativa vigente",
    description:
      "Las providencias de facturación en Venezuela explicadas: normas generales, medios digitales, imprentas digitales, la derogatoria de 2026 y las máquinas fiscales.",
    summary:
      "Un mapa de las providencias que rigen la facturación en Venezuela a noviembre de 2026, qué cambió este año y qué revisar en tu sistema.",
    published: GUIDES_PUBLISHED,
    systems: ["forseti", "valhalla", "bifrost"],
    legal: true,
    intro: [
      "Entre diciembre de 2024 y octubre de 2026 el SENIAT publicó varias providencias que cambian cómo se emiten las facturas en Venezuela. Algunas siguen vigentes, una fue derogada y otra tiene un plazo de adaptación que todavía corre.",
      "Esta guía resume el panorama a noviembre de 2026 para que sepas qué preguntarle a tu contador y qué exigirle a tu sistema de facturación. Las fechas y números vienen de las Gacetas Oficiales citadas al final, a través de resúmenes de firmas y medios especializados.",
    ],
    sections: [
      {
        id: "normas",
        heading: "Las normas que hay que tener presentes",
        blocks: [
          {
            type: "list",
            items: [
              "Providencia SNAT/2011/00071, publicada en la Gaceta Oficial N.º 39.795 del 8 de noviembre de 2011. Son las normas generales de emisión de facturas y otros documentos, y siguen siendo la referencia para lo que las providencias más recientes no regulan.",
              "Providencia SNAT/2024/000102, publicada en la Gaceta Oficial N.º 43.032 del 19 de diciembre de 2024. Regula el uso de medios digitales para emitir facturas, notas de crédito y de débito y otros documentos fiscales, con un número de control asignado por una imprenta digital autorizada.",
              "Providencia SNAT/2024/000121, publicada en la misma gaceta. Regulaba la homologación de los proveedores de sistemas de facturación. Fue derogada por la Providencia SNAT/2026/00084, publicada en la Gaceta Oficial N.º 43.435 del 12 de agosto de 2026.",
              "Providencia SNAT/2026/00093, publicada el 21 de octubre de 2026. Según los resúmenes publicados, deja de exigir las máquinas fiscales como medio obligatorio, permite emitir por medios digitales o por máquinas fiscales autorizadas y fija un plazo de adaptación de 180 días.",
            ],
          },
          {
            type: "note",
            text: "Las fuentes no coinciden en la fecha exacta en que la Providencia 00093 se aplica por completo. Antes de cambiar tu forma de facturar, confirma el texto en la Gaceta Oficial o con tu contador.",
          },
        ],
      },
      {
        id: "derogatoria",
        heading: "Qué cambió con la derogatoria de agosto de 2026",
        blocks: [
          {
            type: "p",
            text: "La Providencia 000121 exigía que el software de facturación viniera de un proveedor homologado por el SENIAT. Con su derogatoria, esa homologación deja de ser un requisito para el sistema que usas.",
          },
          {
            type: "p",
            text: "Lo que no cambió es la obligación de facturar bien. Las firmas que analizaron la derogatoria advierten que no debe leerse como una eliminación de los deberes de emisión, conservación y soporte de las facturas. Las reglas de la Providencia 00071 y de la 000102 siguen ahí.",
          },
        ],
      },
      {
        id: "factura-bien-hecha",
        heading: "Lo que no cambia: una factura bien hecha",
        blocks: [
          {
            type: "p",
            text: "La lista completa de requisitos está en las providencias. Estos son los que más fallan en la práctica y los que conviene exigirle a cualquier sistema:",
          },
          {
            type: "list",
            items: [
              "Numeración correlativa, sin saltos ni duplicados, aunque facturen varias cajas a la vez.",
              "Número de control, asignado por el medio de emisión que te corresponda.",
              "Datos del emisor y del comprador: razón social o nombre, RIF o cédula y domicilio fiscal.",
              "Fecha de emisión, descripción, cantidad y precio de cada concepto.",
              "Base imponible e IVA desglosados. La alícuota general es 16 %.",
              "Montos en bolívares. Si la operación es en divisas, el monto en divisas junto a su equivalente en bolívares a la tasa del BCV.",
            ],
          },
        ],
      },
      {
        id: "correcciones",
        heading: "Una factura emitida no se edita",
        blocks: [
          {
            type: "p",
            text: "Si una factura salió con un error, no se corrige ni se anula editándola. Se emite una nota de crédito, que reduce el monto, o una nota de débito, que lo aumenta, y cada una lleva su propio número de control y hace referencia a la factura original.",
          },
          {
            type: "example",
            title: "Ejemplo",
            rows: [
              ["Factura 000245", "Se cobraron 3 unidades en lugar de 2"],
              ["Lo incorrecto", "Abrir la factura y cambiar la cantidad"],
              ["Lo correcto", "Emitir una nota de crédito por 1 unidad que cite la factura 000245"],
              ["Libro de ventas", "Registra la factura y la nota, cada una con su número"],
            ],
          },
        ],
      },
      {
        id: "igtf",
        heading: "El IGTF cuando cobras en divisas",
        blocks: [
          {
            type: "p",
            text: "Si tu negocio es contribuyente especial, la Providencia SNAT/2022/000013, publicada en la Gaceta Oficial N.º 42.339 del 17 de marzo de 2022, lo designa agente de percepción del Impuesto a las Grandes Transacciones Financieras. En la práctica, cobras un 3 % adicional sobre lo que el cliente paga en divisas y lo reflejas en la factura con su alícuota y su monto.",
          },
          {
            type: "p",
            text: "El IGTF se calcula solo sobre la parte pagada en divisas. En un pago mixto, lo pagado en bolívares no lo lleva. Si no sabes si tu negocio es agente de percepción, pregúntale a tu contador antes de configurarlo.",
          },
        ],
      },
      {
        id: "checklist",
        heading: "Qué revisar en tu sistema de facturación",
        blocks: [
          {
            type: "list",
            items: [
              "¿Puede saltarse o repetirse un número si dos cajas facturan al mismo tiempo?",
              "¿Se puede editar o borrar una factura ya emitida?",
              "¿Las notas de crédito pueden sumar más que la factura que corrigen?",
              "¿El IVA y el IGTF son configurables y el IGTF se aplica solo a lo pagado en divisas?",
              "¿Genera el libro de ventas mensual y lo exporta para tu contador?",
              "¿Cómo se integra con el medio de emisión que te corresponde según la Providencia 000102?",
            ],
          },
        ],
      },
      {
        id: "como-lo-resolvemos",
        heading: "Cómo lo resolvemos en OdinCodex",
        blocks: [
          {
            type: "p",
            text: "Forseti emite facturas con número de control correlativo, sin saltos ni duplicados aunque facturen varias cajas, y una factura emitida no se edita ni se borra. Las correcciones se hacen solo con notas de crédito o de débito; la nota de crédito exige PIN de supervisor y nunca suma más que la factura. El IVA y el IGTF son configurables, el IGTF se aplica solo a lo pagado en divisas y el libro de ventas mensual se exporta a Excel, CSV y PDF. En la demo revisamos contigo cómo encaja con el medio de emisión que te corresponda.",
          },
        ],
      },
    ],
    sources: [
      {
        label: "PwC Venezuela: nota de actualidad sobre medios digitales para facturas (Providencia SNAT/2024/000102)",
        url: "https://www.pwc.com/ve/es/assets/documentos/stl/Nota-de-actualidad-Medios-Digitales-para-Facturas-2025.pdf",
      },
      {
        label: "Finanzas Digital: Gaceta Oficial N.º 43.032, medios digitales para la emisión de facturas",
        url: "https://finanzasdigital.com/gaceta-oficial-n-43-032-medios-digitales-emision-facturas/",
      },
      {
        label: "Baker McKenzie: SENIAT deroga las normas sobre proveedores de sistemas de facturación (2026)",
        url: "https://www.bakermckenzie.com/en/insight/publications/2026/08/venezuela-seniat-repeals-rules-for-invoice-system-providers",
      },
      {
        label: "Forvis Mazars: FMI 07-26, derogatoria de sistemas homologados",
        url: "https://www.forvismazars.com/ve/es/insights/forvis-mazars-insights/fmi-0726-derogatoria-de-sistemas-homologados",
      },
      {
        label: "Finanzas Digital: SENIAT levanta el uso obligatorio de máquinas fiscales",
        url: "https://finanzasdigital.com/seniat-levanta-uso-obligatorio-maquinas-fiscales-gaceta-oficial/",
      },
      {
        label: "Forvis Mazars: designación de los contribuyentes especiales como agentes de percepción del IGTF",
        url: "https://forvismazars.com/ve/en/content/download/1091465/file/InfoMazars%2007-2022%20-%20Designaci%C3%B3n%20de%20los%20SPE%20como%20Agentes%20de%20Percepci%C3%B3n%20IGTF.pdf",
      },
    ],
  },

  {
    slug: "calculo-prestaciones-sociales-lottt",
    title: "Cómo se calculan las prestaciones sociales según la LOTTT",
    seoTitle: "Cómo calcular las prestaciones sociales según la LOTTT, con ejemplo",
    description:
      "Garantía trimestral, días adicionales, cálculo retroactivo, intereses y anticipos: cómo se calculan las prestaciones sociales en Venezuela, con un ejemplo.",
    summary:
      "El doble cálculo del artículo 142 de la LOTTT explicado paso a paso, con un ejemplo y los errores que más encarecen una liquidación.",
    published: GUIDES_PUBLISHED,
    systems: ["asgard"],
    legal: true,
    intro: [
      "Las prestaciones sociales son el ahorro que la empresa acumula para cada trabajador mientras dura la relación laboral. En Venezuela las regula el artículo 142 de la Ley Orgánica del Trabajo, los Trabajadores y las Trabajadoras (LOTTT), publicada en la Gaceta Oficial Extraordinaria N.º 6.076 del 7 de mayo de 2012.",
      "La ley pide hacer dos cálculos distintos y pagar el que resulte mayor. Esta guía explica cada uno, muestra un ejemplo con cifras ilustrativas y repasa los errores más comunes.",
    ],
    sections: [
      {
        id: "garantia",
        heading: "Primer cálculo: la garantía trimestral",
        blocks: [
          {
            type: "p",
            text: "Según el literal a del artículo 142, cada trimestre el patrono deposita a favor del trabajador el equivalente a 15 días de salario. La jurisprudencia de la Sala de Casación Social ha precisado que la base es el salario integral del último mes del trimestre.",
          },
          {
            type: "p",
            text: "Según el artículo 143, ese depósito puede ir a un fideicomiso individual o quedar acreditado en la contabilidad de la empresa, a elección del trabajador, y genera intereses a la tasa que fija el Banco Central de Venezuela.",
          },
        ],
      },
      {
        id: "dias-adicionales",
        heading: "Los días adicionales por antigüedad",
        blocks: [
          {
            type: "p",
            text: "El literal b agrega, después del primer año de servicio, dos días de salario por cada año adicional, acumulativos hasta un máximo de 30 días. En la lectura más extendida, el segundo año suma 2 días, el tercero 4, el cuarto 6, y así hasta llegar a 30. Estos días forman parte de la garantía.",
          },
        ],
      },
      {
        id: "retroactivo",
        heading: "Segundo cálculo: el retroactivo",
        blocks: [
          {
            type: "p",
            text: "El literal c ordena calcular, al terminar la relación laboral, 30 días por cada año de servicio o fracción superior a seis meses, con base en el último salario. Es un cálculo hecho de una sola vez, al final.",
          },
          {
            type: "p",
            text: "Por eso el retroactivo protege al trabajador cuando el salario sube mucho cerca del egreso: todo el tiempo de servicio se valora con el salario más reciente.",
          },
        ],
      },
      {
        id: "que-se-paga",
        heading: "Qué se paga al final",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Se suma todo lo depositado como garantía, incluidos los días adicionales.",
              "Se hace el cálculo retroactivo con el último salario.",
              "Según el literal d, el trabajador recibe el monto mayor de los dos.",
              "Se descuentan los anticipos que haya recibido. El artículo 144 permite adelantar hasta el 75 % de lo acreditado en la garantía.",
              "Se pagan aparte los intereses acumulados sobre la garantía.",
            ],
          },
        ],
      },
      {
        id: "ejemplo",
        heading: "Un ejemplo paso a paso",
        blocks: [
          {
            type: "p",
            text: "Una trabajadora con 3 años y 8 meses de servicio. Para simplificar, primero suponemos un salario integral constante de Bs 400,00 diarios durante toda la relación.",
          },
          {
            type: "example",
            title: "Ejemplo con salario constante",
            rows: [
              ["Trimestres completos", "14 trimestres × 15 días = 210 días"],
              ["Días adicionales", "Año 2: 2 días + año 3: 4 días = 6 días"],
              ["Garantía", "216 días × Bs 400,00 = Bs 86.400,00"],
              ["Retroactivo", "4 años (los 8 meses cuentan como año) × 30 días = 120 días × Bs 400,00 = Bs 48.000,00"],
              ["Se paga", "La garantía: Bs 86.400,00, más intereses y menos anticipos"],
            ],
            note: "Con un salario estable, la garantía casi siempre es mayor.",
          },
          {
            type: "p",
            text: "Ahora supongamos que el salario subió mucho en el último año y que el último salario integral es de Bs 1.200,00 diarios, mientras la garantía se depositó con salarios más bajos y acumula Bs 86.400,00.",
          },
          {
            type: "example",
            title: "Ejemplo con salario que sube",
            rows: [
              ["Garantía acumulada", "Bs 86.400,00"],
              ["Retroactivo", "120 días × Bs 1.200,00 = Bs 144.000,00"],
              ["Se paga", "El retroactivo: Bs 144.000,00, menos anticipos, más los intereses de la garantía"],
            ],
            note: "Las cifras son ilustrativas. Con tus datos reales, el resultado depende de cada salario trimestral.",
          },
        ],
      },
      {
        id: "salario-integral",
        heading: "Qué entra en el salario integral",
        blocks: [
          {
            type: "p",
            text: "El salario integral suma al salario normal la parte proporcional de las utilidades y del bono vacacional. Calcular la garantía con el salario básico en lugar del integral es el error más frecuente y el que más pesa en una demanda.",
          },
        ],
      },
      {
        id: "errores",
        heading: "Errores que encarecen una liquidación",
        blocks: [
          {
            type: "list",
            items: [
              "Usar el salario básico en lugar del integral.",
              "No contar como año completo la fracción superior a seis meses en el retroactivo.",
              "Olvidar descontar los anticipos ya pagados, o no tener cómo demostrarlos.",
              "Calcular la liquidación a la fecha de pago y no a la fecha de egreso.",
              "No llevar registro de cada depósito trimestral con su salario base.",
            ],
          },
        ],
      },
      {
        id: "como-lo-resolvemos",
        heading: "Cómo lo resolvemos en OdinCodex",
        blocks: [
          {
            type: "p",
            text: "Asgard lleva el depósito trimestral de prestaciones y los días adicionales por antigüedad, calcula la liquidación a la fecha de egreso aunque se pague después y paga lo mayor entre lo depositado y el cálculo retroactivo. Permite simular la liquidación de cualquier empleado sin guardar nada, y cada liquidación crea sola su cuenta por pagar en tesorería. También calcula vacaciones y bono vacacional según la LOTTT.",
          },
        ],
      },
    ],
    sources: [
      {
        label: "Acceso a la Justicia: sentencia sobre la base salarial de cálculo de la garantía de prestaciones sociales",
        url: "https://accesoalajusticia.org/sentencia-que-establece-la-base-salarial-de-calculo-para-la-garantia-de-prestaciones-sociales/",
      },
      {
        label: "Acceso a la Justicia: base de cálculo para los días adicionales del artículo 142, literal b, de la LOTTT",
        url: "https://accesoalajusticia.org/base-de-calculo-para-dias-adicionales-de-prestaciones-sociales-art-142-b-lottt/",
      },
      {
        label: "Acceso a la Justicia: forma de calcular las prestaciones sociales (Sala de Casación Social)",
        url: "https://accesoalajusticia.org/forma-de-calcular-las-prestaciones-sociales/",
      },
      {
        label: "vLex Venezuela: breves consideraciones a la prestación social o de antigüedad en la LOTTT",
        url: "https://vlexvenezuela.com/vid/breves-consideraciones-prestacion-social-652161441",
      },
    ],
  },

  {
    slug: "caja-dolares-bolivares-tasa-bcv",
    title: "Caja en dólares y bolívares con tasa BCV en restaurantes y bares",
    seoTitle: "Caja en dólares y bolívares con tasa BCV para restaurantes y bares",
    description:
      "Cómo llevar una caja bimoneda sin descuadres: una sola tasa BCV, pagos mixtos, IGTF sobre lo cobrado en divisas y cierre de caja por turno, con un ejemplo.",
    summary:
      "Una sola tasa para todo el negocio, pagos mixtos bien registrados, el IGTF en su sitio y un cierre por turno que cuadra.",
    published: GUIDES_PUBLISHED,
    systems: ["valhalla", "forseti", "heimdall"],
    legal: true,
    intro: [
      "En un restaurante venezolano la carta está en dólares, el cliente paga una parte en efectivo en divisas y el resto por pago móvil, y la caja tiene que cuadrar en las dos monedas al final del turno. Cuando no cuadra, casi nunca es por un robo: es por tasas distintas, pagos mal clasificados o vueltos que nadie anotó.",
      "Esta guía ordena la caja bimoneda en cuatro decisiones: qué tasa usar, cómo registrar los pagos mixtos, cómo tratar el IGTF y cómo cerrar cada turno.",
    ],
    sections: [
      {
        id: "una-tasa",
        heading: "Una sola tasa para todo el negocio",
        blocks: [
          {
            type: "p",
            text: "La referencia para facturar e informar al SENIAT es la tasa oficial que publica el Banco Central de Venezuela. El problema operativo empieza cuando cada cajero tiene su propia tasa: uno la actualizó en la mañana, otro sigue con la de ayer, y el mesonero calcula con la calculadora del teléfono.",
          },
          {
            type: "list",
            items: [
              "Define una sola tasa del día para todo el sistema, cargada a la misma hora.",
              "Guarda los precios en dólares y calcula los bolívares en el momento del cobro.",
              "Limita quién puede corregir la tasa y deja registro de cada cambio.",
              "Muestra al cliente el monto exacto en bolívares, al céntimo, para que el pago móvil coincida.",
            ],
          },
        ],
      },
      {
        id: "pagos-mixtos",
        heading: "Pagos mixtos sin perder el hilo",
        blocks: [
          {
            type: "p",
            text: "Un mismo consumo puede pagarse con efectivo en dólares, efectivo en bolívares, tarjeta, transferencia y pago móvil. Para que la caja cuadre, cada parte se registra por separado con su método y su moneda, y no como un total.",
          },
          {
            type: "list",
            items: [
              "Registra el vuelto como un movimiento propio, en la moneda en que se entregó.",
              "Verifica cada pago móvil contra el banco antes de cerrar la cuenta.",
              "Separa el servicio y la propina del consumo, para que no se mezclen con la venta.",
            ],
          },
        ],
      },
      {
        id: "igtf",
        heading: "El IGTF sobre lo cobrado en divisas",
        blocks: [
          {
            type: "p",
            text: "Si tu negocio es contribuyente especial, la Providencia SNAT/2022/000013 lo designa agente de percepción del IGTF: cobra un 3 % adicional sobre lo que el cliente paga en divisas y lo refleja en la factura. Lo pagado en bolívares no lleva IGTF, así que en un pago mixto el impuesto se calcula solo sobre la parte en divisas. Si no tienes claro si te aplica, confírmalo con tu contador.",
          },
        ],
      },
      {
        id: "ejemplo",
        heading: "Un cobro mixto, paso a paso",
        blocks: [
          {
            type: "example",
            title: "Ejemplo con una tasa ilustrativa de Bs 200,00 por dólar",
            rows: [
              ["Consumo de la mesa", "USD 40,00, IVA incluido para simplificar"],
              ["Equivalente", "USD 40,00 × 200,00 = Bs 8.000,00"],
              ["Paga en efectivo", "USD 20,00"],
              ["IGTF, si eres agente de percepción", "3 % de USD 20,00 = USD 0,60"],
              ["Resto por pago móvil", "USD 20,00 × 200,00 = Bs 4.000,00 exactos"],
              ["En el cierre", "USD 20,60 en efectivo y Bs 4.000,00 en pago móvil verificado"],
            ],
            note: "La tasa y los montos son ilustrativos. Usa la tasa oficial del BCV del día.",
          },
        ],
      },
      {
        id: "cierre",
        heading: "El cierre de caja por turno",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Abre cada turno con un fondo de caja contado, en cada moneda.",
              "Al cerrar, cuenta el efectivo por moneda sin ver lo que el sistema espera.",
              "Compara con los totales del sistema, desglosados por moneda y por método de pago.",
              "Justifica cada diferencia y asigna el faltante al responsable del turno.",
              "Imprime o guarda el arqueo con la firma de quien entrega y quien recibe.",
            ],
          },
          {
            type: "note",
            text: "Cerrar por turno y por cajero, y no al final del día, es lo que permite saber dónde se originó una diferencia.",
          },
        ],
      },
      {
        id: "servicio",
        heading: "Servicio y propinas",
        blocks: [
          {
            type: "p",
            text: "Si cobras un porcentaje de servicio, conviene que se aplique de forma automática solo cuando atiende un mesonero, en lugar de que el cajero lo agregue a mano. Así no se cobra en la barra ni en los pedidos para llevar, y el monto se reparte con la misma regla en la nómina.",
          },
        ],
      },
      {
        id: "como-lo-resolvemos",
        heading: "Cómo lo resolvemos en OdinCodex",
        blocks: [
          {
            type: "p",
            text: "Valhalla ERP, en producción en Arena Restobar, usa una sola tasa BCV para todo el sistema, corregible solo con PIN. Acepta pagos mixtos en efectivo, tarjeta, transferencia, pago móvil y descuento por nómina, y cierra la caja por turno y por cajero con arqueo impreso y totales en dólares y bolívares por método de pago. El servicio se aplica solo cuando atiende un mesonero. Forseti agrega el IVA y el IGTF configurables en la factura, y Heimdall verifica cada pago móvil contra el banco.",
          },
        ],
      },
    ],
    sources: [
      {
        label: "Forvis Mazars: designación de los contribuyentes especiales como agentes de percepción del IGTF",
        url: "https://forvismazars.com/ve/en/content/download/1091465/file/InfoMazars%2007-2022%20-%20Designaci%C3%B3n%20de%20los%20SPE%20como%20Agentes%20de%20Percepci%C3%B3n%20IGTF.pdf",
      },
      {
        label: "Finanzas Digital: glosario, Impuesto a las Grandes Transacciones Financieras",
        url: "https://finanzasdigital.com/glosario/igtf/",
      },
    ],
  },

  {
    slug: "inventario-por-receta-restaurantes",
    title: "Inventario por receta en restaurantes y bares",
    seoTitle: "Inventario por receta (escandallo) en restaurantes y bares",
    description:
      "Cómo armar recetas estándar, calcular el costo de cada plato y descontar el inventario por receta para encontrar dónde se pierde la mercancía.",
    summary:
      "Recetas estándar con su costo, descuento automático del inventario y cómo leer la diferencia entre lo que debió gastarse y lo que se gastó.",
    published: GUIDES_PUBLISHED,
    systems: ["valhalla"],
    intro: [
      "Casi todos los restaurantes saben cuánto venden. Pocos saben cuánto deberían haber gastado en insumos para vender eso. La diferencia entre las dos cifras es donde se pierde el margen: porciones generosas, mermas que nadie anota, compras más caras y mercancía que sale sin venderse.",
      "El inventario por receta resuelve esa pregunta. Cada plato o trago tiene una receta con sus insumos, y cada venta descuenta esos insumos del almacén. Esta guía explica cómo montarlo paso a paso.",
    ],
    sections: [
      {
        id: "que-es",
        heading: "Qué es una receta estándar",
        blocks: [
          {
            type: "p",
            text: "Una receta estándar, también llamada escandallo, es la lista de insumos de un producto con su cantidad exacta y su costo. Responde tres preguntas: qué lleva, cuánto lleva y cuánto cuesta. Si la receta no está escrita, cada cocinero sirve su versión y el costo real es imposible de conocer.",
          },
        ],
      },
      {
        id: "paso-a-paso",
        heading: "Cómo armar una receta paso a paso",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Elige los productos que más vendes. Con veinte recetas suele cubrirse la mayor parte de la venta.",
              "Pesa cada insumo en la preparación real, no de memoria.",
              "Registra la cantidad en la unidad en que compras, o define la conversión: kilos a gramos, botellas a onzas.",
              "Incluye la merma: lo que se pierde al limpiar, cortar o cocinar.",
              "Asigna a cada insumo su último costo de compra.",
              "Calcula el costo del plato y compáralo con su precio de venta.",
            ],
          },
        ],
      },
      {
        id: "ejemplo",
        heading: "Un ejemplo de costo por plato",
        blocks: [
          {
            type: "example",
            title: "Ejemplo: hamburguesa clásica",
            rows: [
              ["Pan", "1 unidad = USD 0,35"],
              ["Carne", "180 g a USD 8,00 el kilo = USD 1,44"],
              ["Queso", "30 g = USD 0,30"],
              ["Vegetales y salsas", "USD 0,35"],
              ["Papas", "200 g = USD 0,40"],
              ["Costo del plato", "USD 2,84"],
              ["Precio de venta", "USD 9,00, costo de insumos del 31,6 %"],
            ],
            note: "Precios ilustrativos. Lo importante es el método: cada insumo con su cantidad y su último costo.",
          },
        ],
      },
      {
        id: "subrecetas",
        heading: "Preparaciones dentro de otras recetas",
        blocks: [
          {
            type: "p",
            text: "La salsa de la casa, el fondo o el sirope de la barra se preparan por lotes y se usan en varios productos. Trátalos como subrecetas: tienen sus propios insumos y su costo, y entran en otras recetas como un insumo más. Así, si sube el precio de un ingrediente de la salsa, se actualiza el costo de todos los platos que la llevan.",
          },
        ],
      },
      {
        id: "del-recetario-al-inventario",
        heading: "Del recetario al inventario",
        blocks: [
          {
            type: "p",
            text: "Con las recetas cargadas, cada venta descuenta sus insumos del almacén correspondiente. Para que la cifra sea confiable:",
          },
          {
            type: "list",
            items: [
              "Separa los almacenes por área: depósito, cocina y barra.",
              "Descuenta al entregar lo vendido, no al tomar el pedido, para que un plato anulado no reste.",
              "Registra los traslados del depósito a cocina y barra.",
              "Registra las mermas con su motivo y, si es posible, con foto.",
              "Haz conteos físicos periódicos sin mostrar al contador cuánto espera el sistema.",
            ],
          },
        ],
      },
      {
        id: "leer-la-diferencia",
        heading: "Cómo leer la diferencia",
        blocks: [
          {
            type: "p",
            text: "Al contar, compara la existencia real con la que calculó el sistema. Una diferencia pequeña es normal; una grande tiene casi siempre una de estas causas:",
          },
          {
            type: "list",
            items: [
              "Porciones más grandes que las de la receta.",
              "Mermas que ocurrieron y no se registraron.",
              "Recetas desactualizadas después de cambiar el plato.",
              "Compras recibidas que no se cargaron, o cargadas dos veces.",
              "Mercancía que salió sin venderse.",
            ],
          },
          {
            type: "note",
            text: "Revisa primero los insumos más caros. Una diferencia en whisky o en proteína pesa mucho más que una en sal.",
          },
        ],
      },
      {
        id: "costos",
        heading: "Mantener los costos al día",
        blocks: [
          {
            type: "p",
            text: "En una economía con precios cambiantes, el costo de un plato envejece rápido. Actualiza el costo de cada insumo con cada compra, vigila los proveedores que suben más de lo habitual y revisa el margen de tus platos principales al menos una vez al mes.",
          },
        ],
      },
      {
        id: "como-lo-resolvemos",
        heading: "Cómo lo resolvemos en OdinCodex",
        blocks: [
          {
            type: "p",
            text: "Valhalla ERP, en producción en Arena Restobar, maneja recetas por producto con sus insumos, incluidas preparaciones dentro de otras, y recalcula el costo del plato al guardar su receta, con conversión de unidades y alertas de margen en riesgo. Descuenta el inventario por receta al entregar lo vendido, con almacenes por área, mermas con foto obligatoria, traslados y conteos físicos a ciegas que alertan si la diferencia es grande. En compras guarda el historial de precios y avisa si un precio varía más de 10 %.",
          },
        ],
      },
    ],
  },
];

export function findGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

/** Words in the body, for the reading time (about 200 words per minute). */
export function readingMinutes(guide: Guide): number {
  const text = [
    ...guide.intro,
    ...guide.sections.flatMap((s) => [
      s.heading,
      ...s.blocks.flatMap((b) => {
        switch (b.type) {
          case "p":
          case "note":
            return [b.text];
          case "list":
            return b.items;
          case "example":
            return [b.title, ...b.rows.flat(), b.note ?? ""];
        }
      }),
    ]),
  ].join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function guidesForSystem(id: SystemId): Guide[] {
  return guides.filter((g) => g.systems.includes(id));
}
