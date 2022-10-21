create table Medidas (
    id integer,
    medida float not null,
    fecha varchar not null,
    nombreSensor varchar not null,
    longitud float not null,
    latitud float not null,

    primary key (id AUTOINCREMENT)
);