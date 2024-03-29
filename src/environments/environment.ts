// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


export const environment = {
  production: false,
  dominio: 'https://academy.lat/public/index.php/api/',
  ISLOGGEDKEY: 'token',
  categorias: [
    { id: 1, nombre: 'Talento Humano', tipo_pago: [1, 2, 3] }
    , { id: 2, nombre: 'Estudios de vigilancia tecnológica e inteligencia competitiva', tipo_pago: [1, 2, 3] }
    , { id: 3, nombre: 'Equipos', tipo_pago: [1, 2, 3] }
    , { id: 4, nombre: 'Software', tipo_pago: [1, 2, 3] }
    , { id: 5, nombre: 'Capacitación y actualización de personal', tipo_pago: [1, 2, 3] }
    , { id: 6, nombre: 'Servicios tecnológicos', tipo_pago: [1, 2, 3] }
    , { id: 7, nombre: 'Materia prima e insumos', tipo_pago: [2] }
    , { id: 8, nombre: 'Propiedad intelectual', tipo_pago: [2] }
    , { id: 9, nombre: 'Viajes', tipo_pago: [1, 2, 3] }
    , { id: 10, nombre: 'Seminarios y cursos especializados', tipo_pago: [1, 2, 3] }
    , { id: 11, nombre: 'Consultoría especializada', tipo_pago: [1, 2, 3] }
    , { id: 12, nombre: 'Misiones tecnológicas', tipo_pago: [1, 2, 3] }
    , { id: 13, nombre: 'Divulgación de resultados', tipo_pago: [1, 2, 3] }
    , { id: 14, nombre: 'Imprevistos', tipo_pago: [1, 2, 3] }
    , { id: 15, nombre: 'Administración', tipo_pago: [1, 2, 3] }
    , { id: 16, nombre: 'Gastos asociados a la legalización y perfeccionamiento del contrato', tipo_pago: [3] }
    , { id: 17, nombre: 'Infraestructura o adecuación de laboratorios', tipo_pago: [3] }
    , { id: 18, nombre: 'Personal de planta de la empresa', tipo_pago: [2] }
  ],
  fuentes_financiamento: [
    { id: 1, nombre: 'Cofinanciamiento'}
    , { id: 2, nombre: 'Contrapartida en especie'}
    , { id: 3, nombre: 'Contrapartida en efectivo' }
  ],
  tipos_pregunta: [
    { id: 1, nombre: 'texto' }
    ,{ id: 2, nombre: 'numerico' }
    ,{ id: 3, nombre: 'opciones con multiples respuestas' }
    ,{ id: 4, nombre: 'opciones con unica respuesta' }
    ],
  prefijoImg:'https://academy.lat/storage/app/noticias/'
};
