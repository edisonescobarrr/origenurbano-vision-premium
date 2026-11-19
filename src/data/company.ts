/** Datos de contacto y legales de la empresa: todo el sitio los toma de aquí para que no queden distintos entre páginas */
export const COMPANY = {
  name: "ARQUENO",
  legalName: "ARQUENO S.A.S.",
  nit: "902.105.926-9",
  /** Actividad principal inscrita en el registro mercantil */
  registeredActivity: "Actividades de ingeniería y otras actividades conexas de consultoría técnica",
  address: "Cra. 10 #20-62, Cumbal, Nariño, Colombia",
  email: "arquenocontacto@gmail.com",
  phoneDisplay: "+57 313 606 1920",
  city: "Cumbal, Nariño, Colombia",
  siteUrl: "https://www.arqueno.com",
  domain: "www.arqueno.com",
  hours: {
    weekdays: "Lun - Vie: 8am - 6pm",
    saturday: "Sáb: 9am - 2pm",
  },
} as const;
