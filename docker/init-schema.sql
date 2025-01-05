CREATE SCHEMA relhardware;

set schema 'relhardware';

create table relhardware.roles
(
  id           serial
    constraint "PK_c1433d71a4838793a49dcad46ab"
      primary key,
  name         varchar               not null,
  read         boolean default false not null,
  modify       boolean default false not null,
  read_pdf     boolean default false not null,
  read_history boolean default false not null
);

alter table relhardware.roles
  owner to postgres;

create table relhardware.users
(
  id                serial
    constraint "PK_a3ffb1c0c8416b9fc6f907b7433"
      primary key,
  name              varchar,
  surname           varchar,
  creation_date     timestamp default now() not null,
  modification_date timestamp default now() not null,
  email             varchar                 not null
    constraint "UQ_97672ac88f789774dd47f7c8be3"
      unique,
  password          varchar                 not null,
  enable            boolean   default false not null
);

alter table relhardware.users
  owner to postgres;

create table relhardware.company
(
  id       serial
    constraint "PK_056f7854a7afdba7cbd6d45fc20"
      primary key,
  name     varchar not null,
  location varchar not null,
  city varchar not null,
  "postalCode" varchar not null
);

alter table relhardware.company
  owner to postgres;

create table relhardware.item_types
(
  id   serial
    constraint "PK_3600946a4e5a3a75d973b016132"
      primary key,
  name varchar not null
);

alter table relhardware.item_types
  owner to postgres;

create table relhardware.assignations
(
  id                 serial
    constraint "PK_bd43902627f5fae57eda8b00033"
      primary key,
  "assignationDate"  timestamp default now() not null,
  "modificationDate" timestamp,
  note               text      default ''::text not null,
  "userId"           integer                 not null
    constraint "FK_5e28c9b24262c6407d050f7d05c"
      references relhardware.users
);

alter table relhardware.assignations
  owner to postgres;

create table relhardware.items
(
  id                 serial
    constraint "PK_ba5885359424c15ca6b9e79bcf6"
      primary key,
  "internalCode"     text,
  model              text,
  "serviceTag"       text,
  company            text,
  contract           text,
  "dockingStation"   boolean   default false not null,
  "productNumber"    text,
  "macAddress"       text,
  "creationDate"     timestamp default now() not null,
  "modificationDate" timestamp,
  "itemTypeId"       integer                 not null
    constraint "FK_ba92d7032b89f4fd952899dbbd2"
      references relhardware.item_types,
  "idCompanyId"      integer                 not null
    constraint "FK_6476fb0fdb137d9aa708f18748b"
      references relhardware.company,
  "assignationId"    integer
    constraint "FK_67ca6b4b833aa2a836e3534a2f2"
      references relhardware.assignations
);

alter table relhardware.items
  owner to postgres;

create table relhardware.user_roles
(
  user_id integer not null
    constraint "FK_87b8888186ca9769c960e926870"
      references relhardware.users
      on update cascade on delete cascade,
  role_id integer not null
    constraint "FK_b23c65e50a758245a33ee35fda1"
      references relhardware.roles,
  constraint "PK_23ed6f04fe43066df08379fd034"
    primary key (user_id, role_id)
);

alter table relhardware.user_roles
  owner to postgres;

create index "IDX_87b8888186ca9769c960e92687"
  on relhardware.user_roles (user_id);

create index "IDX_b23c65e50a758245a33ee35fda"
  on relhardware.user_roles (role_id);

