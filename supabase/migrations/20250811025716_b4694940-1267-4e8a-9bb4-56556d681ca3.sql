
-- 1) Triggers fundamentales
-- a) Crear perfil automáticamente al registrarse
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- b) Generar QR al crear una reserva
drop trigger if exists trg_generate_booking_qr on public.bookings;
create trigger trg_generate_booking_qr
  before insert on public.bookings
  for each row execute procedure public.generate_booking_qr();

-- c) Manejar créditos y ledger en reservas (insert/update/delete)
drop trigger if exists trg_booking_credits_handler on public.bookings;
create trigger trg_booking_credits_handler
  after insert or update or delete on public.bookings
  for each row execute procedure public.booking_credits_handler();

-- d) Actualizar cupos disponibles (insert/update/delete de bookings)
drop trigger if exists trg_update_spots_available on public.bookings;
create trigger trg_update_spots_available
  after insert or update or delete on public.bookings
  for each row execute procedure public.update_spots_available();

-- e) updated_at automático en tablas con esa columna
-- perfiles
drop trigger if exists set_updated_at_profiles on public.profiles;
create trigger set_updated_at_profiles
  before update on public.profiles
  for each row execute procedure public.update_updated_at_column();

-- services
drop trigger if exists set_updated_at_services on public.services;
create trigger set_updated_at_services
  before update on public.services
  for each row execute procedure public.update_updated_at_column();

-- classes
drop trigger if exists set_updated_at_classes on public.classes;
create trigger set_updated_at_classes
  before update on public.classes
  for each row execute procedure public.update_updated_at_column();

-- bookings
drop trigger if exists set_updated_at_bookings on public.bookings;
create trigger set_updated_at_bookings
  before update on public.bookings
  for each row execute procedure public.update_updated_at_column();

-- companies
drop trigger if exists set_updated_at_companies on public.companies;
create trigger set_updated_at_companies
  before update on public.companies
  for each row execute procedure public.update_updated_at_column();


-- 2) Plantillas de datos iniciales (REEMPLAZA UUIDs)

-- 2.1) Promocionar un usuario a ADMIN
-- Reemplaza 'ADMIN_USER_UUID'
insert into public.user_roles (user_id, role)
values ('ADMIN_USER_UUID', 'admin')
on conflict do nothing;

-- 2.2) Convertir un usuario en PARTNER y completar su ficha
-- Reemplaza 'PARTNER_USER_UUID'
update public.profiles
set role = 'partner',
    full_name = coalesce(full_name, 'ALMA Yoga'),
    username = coalesce(username, 'almayoga'),
    business_name = 'ALMA Yoga',
    business_address = 'Altamira, Caracas',
    business_description = 'Estudio boutique de Yoga & Pilates con instructores certificados'
where id = 'PARTNER_USER_UUID';

-- 2.3) Crear servicios del partner
-- Reemplaza 'PARTNER_USER_UUID'
insert into public.services (partner_id, name, description, category, credits_required)
values
  ('PARTNER_USER_UUID', 'Yoga Flow', 'Clase grupal de 60 minutos', 'yoga-pilates', 2),
  ('PARTNER_USER_UUID', 'Pilates Reformer', 'Clase en reformer de 55 minutos', 'yoga-pilates', 3);

-- 2.4) Crear clases de ejemplo para esos servicios (mañana y tarde)
-- Yoga Flow
with s as (
  select id from public.services 
  where partner_id = 'PARTNER_USER_UUID' and name = 'Yoga Flow' limit 1
)
insert into public.classes (service_id, title, start_time, duration_minutes, capacity, spots_available, instructor_name)
select id, 'Yoga Flow AM', date_trunc('day', now()) + interval '1 day' + interval '8 hour', 60, 15, 15, 'María Fernández' from s
union all
select id, 'Yoga Flow PM', date_trunc('day', now()) + interval '1 day' + interval '19 hour', 60, 15, 15, 'María Fernández' from s;

-- Pilates Reformer
with s as (
  select id from public.services 
  where partner_id = 'PARTNER_USER_UUID' and name = 'Pilates Reformer' limit 1
)
insert into public.classes (service_id, title, start_time, duration_minutes, capacity, spots_available, instructor_name)
select id, 'Pilates Reformer AM', date_trunc('day', now()) + interval '1 day' + interval '9 hour', 55, 10, 10, 'Carlos Mendoza' from s
union all
select id, 'Pilates Reformer PM', date_trunc('day', now()) + interval '1 day' + interval '18 hour', 55, 10, 10, 'Carlos Mendoza' from s;

-- 2.5) Crear una empresa y su admin (RRHH)
-- Crea la empresa
insert into public.companies (name, contact_name, contact_email, status)
values ('Acme Venezuela', 'Laura Pérez', 'laura@acme.com', 'active')
returning id;

-- Anota el ID retornado y úsalo abajo como COMPANY_UUID
-- Reemplaza 'COMPANY_UUID' y 'COMPANY_ADMIN_USER_UUID' (usuario RRHH ya registrado)
insert into public.company_members (company_id, user_id, role, is_active)
values ('COMPANY_UUID', 'COMPANY_ADMIN_USER_UUID', 'admin', true);

-- 2.6) Asegurar créditos a un CUSTOMER de prueba (si necesitas más saldo de inicio)
-- Reemplaza 'CUSTOMER_USER_UUID'
update public.profiles
set credits_remaining = greatest(coalesce(credits_remaining, 0), 10)
where id = 'CUSTOMER_USER_UUID';

-- 2.7) Reserva de prueba (opcional)
-- Reemplaza CLASS_ID y CUSTOMER_USER_UUID; credits_used debe coincidir con el servicio
-- Nota: los triggers generarán el QR y descontarán créditos si hay saldo.
insert into public.bookings (customer_id, class_id, status, credits_used, booking_notes)
values ('CUSTOMER_USER_UUID', CLASS_ID, 'confirmed', 2, 'Reserva de prueba');
