CREATE SCHEMA relhardware;

set schema 'relhardware';

CREATE TABLE item_types
(
  id   BIGSERIAL PRIMARY KEY,
  name VARCHAR
);

create table roles
(
  id           bigserial not null
    constraint roles_pkey
      primary key,
  name         varchar,
  read         boolean default false,
  modify       boolean default false,
  read_pdf     boolean default false,
  read_history boolean default false
);

CREATE TABLE pdf_reports
(
  id            BIGSERIAL PRIMARY KEY,
  creation_date TIMESTAMP,
  data          BYTEA
);

CREATE TABLE users
(
  id                BIGSERIAL PRIMARY KEY,
  name              VARCHAR,
  surname           VARCHAR,
  creation_date     TIMESTAMP,
  modification_date TIMESTAMP,
  email             VARCHAR,
  password          VARCHAR,
  enable            BOOLEAN DEFAULT FALSE,
  enable_internet   BOOLEAN DEFAULT FALSE,
  pdf_report        BIGINT
    constraint pdf_reports_fkey
      references pdf_reports
);

-- auto-generated definition
create table items
(
  id                bigserial not null
    constraint items_pkey
      primary key,
  item_type         bigint
    constraint items_item_type_fkey
      references item_types,
  internal_code     text,
  model             text,
  service_tag       text,
  company           text,
  site              text,
  contract          text,
  docking_station   boolean default false,
  product_number    text,
  mac_address       text,
  creation_date     timestamp,
  modification_date timestamp
);

CREATE TABLE assignations
(
  id                BIGSERIAL PRIMARY KEY,
  user_id           BIGINT REFERENCES users (id),
  item_id           BIGINT REFERENCES items (id),
  note              text DEFAULT ''::text,
  assignation_date  TIMESTAMP,
  modification_date TIMESTAMP

);

CREATE TYPE operation AS ENUM ('creation', 'modify', 'delete');

-- auto-generated definition
create table history
(
  id                bigserial             not null
    constraint history_pkey
      primary key,
  logged_user       text,
  operation         relhardware.operation not null,
  description       text,
  description_class text,
  creation_date     timestamp
);


create table user_roles
(
  user_id bigint not null
    constraint user_roles_users_id_fk
      references users,
  role_id bigint not null
    constraint user_roles_roles_id_fk
      references roles,
  constraint user_roles_pkey
    primary key (user_id, role_id)
);

alter table user_roles
  owner to postgres;


create table company
(
  id       bigserial not null
    constraint company_pk
      primary key,
  name     text      not null,
  location text
);


-- UPDATE TABLE

alter table items
drop
column site;

alter table items
  add id_company bigint;

alter table items
  add constraint items_company_id_fk
    foreign key (id_company) references company (id);
