--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Externals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Externals" (
    id integer NOT NULL,
    "userId" integer
);


ALTER TABLE public."Externals" OWNER TO postgres;

--
-- Name: Externals_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Externals_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Externals_id_seq" OWNER TO postgres;

--
-- Name: Externals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Externals_id_seq" OWNED BY public."Externals".id;


--
-- Name: cards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cards (
    id integer NOT NULL,
    description text,
    rfid text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "typeCardId" integer,
    "userId" integer
);


ALTER TABLE public.cards OWNER TO postgres;

--
-- Name: cards_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cards_id_seq OWNER TO postgres;

--
-- Name: cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cards_id_seq OWNED BY public.cards.id;


--
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    status character varying(255) DEFAULT 1,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer,
    "roleId" integer
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- Name: employees_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employees_id_seq OWNER TO postgres;

--
-- Name: employees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employees_id_seq OWNED BY public.employees.id;


--
-- Name: entries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.entries (
    id integer NOT NULL,
    type character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer,
    "turnstileId" integer
);


ALTER TABLE public.entries OWNER TO postgres;

--
-- Name: entries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.entries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.entries_id_seq OWNER TO postgres;

--
-- Name: entries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.entries_id_seq OWNED BY public.entries.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(255),
    description text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: turnstiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.turnstiles (
    id integer NOT NULL,
    name character varying(255),
    description text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.turnstiles OWNER TO postgres;

--
-- Name: turnstiles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.turnstiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.turnstiles_id_seq OWNER TO postgres;

--
-- Name: turnstiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.turnstiles_id_seq OWNED BY public.turnstiles.id;


--
-- Name: typeCards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."typeCards" (
    id integer NOT NULL,
    name character varying(255),
    color character varying(255),
    description text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."typeCards" OWNER TO postgres;

--
-- Name: typeCards_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."typeCards_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."typeCards_id_seq" OWNER TO postgres;

--
-- Name: typeCards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."typeCards_id_seq" OWNED BY public."typeCards".id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    ci character varying(255),
    address text,
    telf character varying(255),
    cel character varying(255),
    inside boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: visits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.visits (
    id integer NOT NULL,
    reason text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "externalId" integer
);


ALTER TABLE public.visits OWNER TO postgres;

--
-- Name: visits_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.visits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.visits_id_seq OWNER TO postgres;

--
-- Name: visits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.visits_id_seq OWNED BY public.visits.id;


--
-- Name: Externals id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Externals" ALTER COLUMN id SET DEFAULT nextval('public."Externals_id_seq"'::regclass);


--
-- Name: cards id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards ALTER COLUMN id SET DEFAULT nextval('public.cards_id_seq'::regclass);


--
-- Name: employees id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees ALTER COLUMN id SET DEFAULT nextval('public.employees_id_seq'::regclass);


--
-- Name: entries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entries ALTER COLUMN id SET DEFAULT nextval('public.entries_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: turnstiles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.turnstiles ALTER COLUMN id SET DEFAULT nextval('public.turnstiles_id_seq'::regclass);


--
-- Name: typeCards id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."typeCards" ALTER COLUMN id SET DEFAULT nextval('public."typeCards_id_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: visits id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visits ALTER COLUMN id SET DEFAULT nextval('public.visits_id_seq'::regclass);


--
-- Data for Name: Externals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Externals" (id, "userId") FROM stdin;
1	5
2	7
\.


--
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cards (id, description, rfid, "createdAt", "updatedAt", "typeCardId", "userId") FROM stdin;
14	Tarjeta A1	12345678910	2023-08-16 17:33:32.539-04	2023-08-17 00:02:21.628-04	10	1
3	Tarjeta R1	1234567890	2023-08-15 04:02:50.473-04	2023-08-17 01:06:50.128-04	8	2
15	Tarjeta V1	511321321313	2023-08-17 00:13:49.921-04	2023-08-17 18:13:38.284-04	11	5
16	Tarjeta V2	asdf4as56f4684	2023-08-17 18:12:47.35-04	2023-08-17 19:35:55.847-04	11	7
17	Tarjeta real	25b6aa00	2023-08-17 20:31:37.509-04	2023-08-17 20:31:58.175-04	10	4
6	Tarjeta P1	8643b51f	2023-08-15 17:54:53.845-04	2023-08-17 21:33:38.97-04	9	6
7	Tarjeta E1	ffffffffff	2023-08-15 17:59:49.31-04	2023-08-17 21:52:37.781-04	6	8
\.


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees (id, email, password, status, "createdAt", "updatedAt", "userId", "roleId") FROM stdin;
1	cristian.beltran.paco@gmail.com	$2a$10$hHjvtZlE9oz755xXUh6XI.oF9kEWgQD8miYnr3PpbnYJPquTIk9uO	1	2023-08-15 02:31:08.597-04	2023-08-18 02:14:53.227-04	1	1
5	portero@gmail.com	$2a$10$/mnLOozp8o8f/5gfa2XQ7uOfUi3W/kEO3gRn7JReVBczJfh9xJjna	1	2023-08-17 17:57:55.239-04	2023-08-18 19:49:42.851-04	6	3
3	prueba@gmail.com	$2a$10$vq9U2IUEi9kuhj4QYHiLTuZpwLqi2eeXVmeSKxoZMVHGL/zlYLSMu	0	2023-08-16 17:55:18.489-04	2023-08-16 17:55:38.493-04	3	3
4	sadmin@gmail.com	$2a$10$gYNM.JYbBH9i8R3x3pRqC.CTnzcdMeaHhSinohiJEVfPo7QKp7hyK	1	2023-08-16 18:04:18.599-04	2023-08-16 18:04:18.599-04	4	1
2	nicole@gmail.com	$2a$10$LPMbxcbEAH.qh/uTfjWBr.9vffSmxvgt0zeouUOk8hCAxO04AHFdy	1	2023-08-16 00:29:20.971-04	2023-08-17 16:55:42.581-04	2	2
6	empleado@gmail.com	$2a$10$AnpJPE35ek6qwfArc3gkAO3DQVOwx8TC.jZXehSEYDqBI5QXmR9Tq	1	2023-08-17 21:52:16.405-04	2023-08-17 21:52:16.405-04	8	3
\.


--
-- Data for Name: entries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.entries (id, type, "createdAt", "updatedAt", "userId", "turnstileId") FROM stdin;
2	exit	2023-08-17 20:09:02.268-04	2023-08-17 20:09:02.268-04	2	1
4	exit	2023-08-17 20:10:07.597-04	2023-08-17 20:10:07.597-04	2	1
6	exit	2023-08-17 20:10:16.802-04	2023-08-17 20:10:16.802-04	2	1
9	exit	2023-08-17 20:20:45.157-04	2023-08-17 20:20:45.157-04	2	1
11	exit	2023-08-17 21:25:23.233-04	2023-08-17 21:25:23.233-04	4	1
12	entry	2023-08-17 21:25:36.718-04	2023-08-17 21:25:36.718-04	4	1
13	entry	2023-08-17 21:25:38.863-04	2023-08-17 21:25:38.863-04	4	1
14	entry	2023-08-17 21:25:41.114-04	2023-08-17 21:25:41.114-04	4	1
15	exit	2023-08-17 21:27:32.381-04	2023-08-17 21:27:32.381-04	4	1
16	entry	2023-08-17 21:27:40.846-04	2023-08-17 21:27:40.846-04	4	1
17	entry	2023-08-17 21:28:33.473-04	2023-08-17 21:28:33.473-04	4	1
18	exit	2023-08-17 21:30:10.379-04	2023-08-17 21:30:10.379-04	4	1
19	entry	2023-08-17 21:32:30.24-04	2023-08-17 21:32:30.24-04	4	1
20	exit	2023-08-17 21:33:47.09-04	2023-08-17 21:33:47.09-04	6	1
21	exit	2023-08-17 21:33:49.855-04	2023-08-17 21:33:49.855-04	6	1
22	entry	2023-08-17 21:33:55.597-04	2023-08-17 21:33:55.597-04	6	1
23	entry	2023-08-17 21:33:57.942-04	2023-08-17 21:33:57.942-04	6	1
24	exit	2023-08-17 21:37:54.737-04	2023-08-17 21:37:54.737-04	4	1
1	entry	2023-08-17 20:02:41.483-04	2023-08-17 20:02:41.483-04	2	1
3	entry	2023-08-17 20:09:19.42-04	2023-08-17 20:09:19.42-04	2	1
5	entry	2023-08-17 20:10:10.495-04	2023-08-17 20:10:10.495-04	2	1
7	entry	2023-08-17 20:10:21.073-04	2023-08-17 20:10:21.073-04	2	1
8	entry	2023-08-17 20:20:39.97-04	2023-08-17 20:20:39.97-04	2	1
10	entry	2023-08-17 20:38:46.58-04	2023-08-17 20:38:46.58-04	1	1
25	entry	2023-08-18 00:37:53.697-04	2023-08-18 00:37:53.697-04	6	1
26	entry	2023-08-18 00:48:16.09-04	2023-08-18 00:48:16.09-04	6	1
27	exit	2023-08-18 01:17:02.814-04	2023-08-18 01:17:02.814-04	6	1
28	entry	2023-08-18 20:25:46.768-04	2023-08-18 20:25:46.768-04	6	1
31	entry	2023-08-18 20:28:35.971-04	2023-08-18 20:28:35.971-04	2	1
32	entry	2023-08-18 22:15:08.192-04	2023-08-18 22:15:08.192-04	5	1
29	entry	2023-08-18 20:28:22.282-04	2023-08-18 20:28:22.282-04	2	1
30	entry	2023-08-18 20:28:34.058-04	2023-08-18 20:28:34.058-04	2	1
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name, description, "createdAt", "updatedAt") FROM stdin;
2	RRHH	Usuarios de recursos humanos	2023-08-15 22:10:08.019-04	2023-08-15 22:11:05.535-04
3	Portero	Usuarios porteros de envibol	2023-08-15 22:11:27.92-04	2023-08-15 22:11:27.92-04
1	SAdmin	Usuario super administrador del sistema	2023-08-15 02:30:53.624-04	2023-08-15 22:12:27.012-04
\.


--
-- Data for Name: turnstiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.turnstiles (id, name, description, "createdAt", "updatedAt") FROM stdin;
1	Molino 1	Primer molino de la izquierda	2023-08-15 22:01:56.849-04	2023-08-15 22:02:52.935-04
2	Molino 2	Molino 2	2023-08-16 18:02:43.013-04	2023-08-16 18:02:43.013-04
\.


--
-- Data for Name: typeCards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."typeCards" (id, name, color, description, "createdAt", "updatedAt") FROM stdin;
6	Empleado	#f66151	Tarjeta de empleados	2023-08-15 03:23:52.141-04	2023-08-15 03:24:32.598-04
8	RRHH	#99c1f1	Recursos humanos	2023-08-15 03:44:57.454-04	2023-08-15 03:44:57.454-04
9	Porteros	#f6d32d	Porteros	2023-08-15 17:53:26.84-04	2023-08-15 17:53:26.84-04
10	Administrador	#c01c28	Tarjeta de administrador	2023-08-16 17:33:06.201-04	2023-08-16 17:33:06.201-04
11	Visitante	#241f31	Tarjetas de visitantes	2023-08-17 00:13:05.772-04	2023-08-17 00:13:05.772-04
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, first_name, last_name, ci, address, telf, cel, inside, "createdAt", "updatedAt") FROM stdin;
3	Usuario	Prueba	112233				f	2023-08-16 17:55:18.475-04	2023-08-16 17:55:18.475-04
7	Visitante 2	Externo	784512				f	2023-08-17 19:35:55.831-04	2023-08-17 19:35:55.831-04
1	Cristian Alexander	Beltran Paco	13104217	Alto obrajes	4626593	72843043	t	2023-08-15 02:31:08.588-04	2023-08-17 20:38:46.595-04
4	Super	Administrador	1321351531				f	2023-08-16 18:04:18.585-04	2023-08-17 21:37:54.746-04
8	empleado	empleado 1	54454545454				f	2023-08-17 21:52:16.396-04	2023-08-17 21:52:16.396-04
6	Primer	portero	753159852				t	2023-08-17 17:57:55.226-04	2023-08-18 20:25:46.779-04
2	Nicole Zafiro	Cordova Quiroga	123456789	Alto Obrajes	46851555	72843043	t	2023-08-16 00:29:20.957-04	2023-08-18 20:28:35.981-04
5	Visitante	externo	123123123	Sopocachi			t	2023-08-16 23:49:11.356-04	2023-08-18 22:15:08.202-04
\.


--
-- Data for Name: visits; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.visits (id, reason, "createdAt", "updatedAt", "externalId") FROM stdin;
1	Visita para revision	2023-08-17 18:37:15.109-04	2023-08-17 18:37:15.109-04	1
2	Visita para revisar molinestes	2023-08-17 19:35:55.848-04	2023-08-17 19:35:55.848-04	2
3	Segunda visita	2023-08-17 19:36:23.486-04	2023-08-17 19:36:23.486-04	1
4	Comprobar sistema	2023-08-18 23:04:21.453-04	2023-08-18 23:04:21.453-04	1
\.


--
-- Name: Externals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Externals_id_seq"', 2, true);


--
-- Name: cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cards_id_seq', 17, true);


--
-- Name: employees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employees_id_seq', 6, true);


--
-- Name: entries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.entries_id_seq', 32, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- Name: turnstiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.turnstiles_id_seq', 2, true);


--
-- Name: typeCards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."typeCards_id_seq"', 12, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- Name: visits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.visits_id_seq', 4, true);


--
-- Name: Externals Externals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Externals"
    ADD CONSTRAINT "Externals_pkey" PRIMARY KEY (id);


--
-- Name: cards cards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (id);


--
-- Name: cards cards_rfid_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key UNIQUE (rfid);


--
-- Name: cards cards_rfid_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key1 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key10 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key100; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key100 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key101; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key101 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key102; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key102 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key103; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key103 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key104; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key104 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key105; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key105 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key106; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key106 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key107; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key107 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key108; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key108 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key109; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key109 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key11 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key110; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key110 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key111; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key111 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key112; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key112 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key113; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key113 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key114; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key114 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key115; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key115 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key116; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key116 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key117; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key117 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key118; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key118 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key12 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key13 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key14 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key15 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key16 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key17 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key18 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key19 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key2 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key20 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key21 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key22 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key23 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key24 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key25 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key26 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key27 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key28 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key29 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key3 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key30 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key31 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key32 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key33 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key34 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key35 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key36 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key37 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key38 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key39 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key4 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key40 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key41 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key42 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key43 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key44 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key45 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key46 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key47 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key48 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key49 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key5 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key50 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key51 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key52 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key53 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key54 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key55 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key56 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key57 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key58 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key59 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key6 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key60 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key61 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key62 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key63 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key64 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key65 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key66 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key67 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key68 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key69 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key7 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key70 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key71 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key72 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key73 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key74 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key75; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key75 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key76; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key76 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key77; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key77 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key78; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key78 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key79; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key79 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key8 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key80; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key80 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key81; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key81 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key82 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key83; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key83 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key84; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key84 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key85; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key85 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key86; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key86 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key87; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key87 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key88; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key88 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key89; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key89 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key9 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key90; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key90 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key91; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key91 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key92; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key92 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key93; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key93 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key94; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key94 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key95; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key95 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key96; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key96 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key97; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key97 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key98; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key98 UNIQUE (rfid);


--
-- Name: cards cards_rfid_key99; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_rfid_key99 UNIQUE (rfid);


--
-- Name: employees employees_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key UNIQUE (email);


--
-- Name: employees employees_email_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key1 UNIQUE (email);


--
-- Name: employees employees_email_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key10 UNIQUE (email);


--
-- Name: employees employees_email_key100; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key100 UNIQUE (email);


--
-- Name: employees employees_email_key101; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key101 UNIQUE (email);


--
-- Name: employees employees_email_key102; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key102 UNIQUE (email);


--
-- Name: employees employees_email_key103; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key103 UNIQUE (email);


--
-- Name: employees employees_email_key104; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key104 UNIQUE (email);


--
-- Name: employees employees_email_key105; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key105 UNIQUE (email);


--
-- Name: employees employees_email_key106; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key106 UNIQUE (email);


--
-- Name: employees employees_email_key107; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key107 UNIQUE (email);


--
-- Name: employees employees_email_key108; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key108 UNIQUE (email);


--
-- Name: employees employees_email_key109; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key109 UNIQUE (email);


--
-- Name: employees employees_email_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key11 UNIQUE (email);


--
-- Name: employees employees_email_key110; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key110 UNIQUE (email);


--
-- Name: employees employees_email_key111; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key111 UNIQUE (email);


--
-- Name: employees employees_email_key112; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key112 UNIQUE (email);


--
-- Name: employees employees_email_key113; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key113 UNIQUE (email);


--
-- Name: employees employees_email_key114; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key114 UNIQUE (email);


--
-- Name: employees employees_email_key115; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key115 UNIQUE (email);


--
-- Name: employees employees_email_key116; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key116 UNIQUE (email);


--
-- Name: employees employees_email_key117; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key117 UNIQUE (email);


--
-- Name: employees employees_email_key118; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key118 UNIQUE (email);


--
-- Name: employees employees_email_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key12 UNIQUE (email);


--
-- Name: employees employees_email_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key13 UNIQUE (email);


--
-- Name: employees employees_email_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key14 UNIQUE (email);


--
-- Name: employees employees_email_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key15 UNIQUE (email);


--
-- Name: employees employees_email_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key16 UNIQUE (email);


--
-- Name: employees employees_email_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key17 UNIQUE (email);


--
-- Name: employees employees_email_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key18 UNIQUE (email);


--
-- Name: employees employees_email_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key19 UNIQUE (email);


--
-- Name: employees employees_email_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key2 UNIQUE (email);


--
-- Name: employees employees_email_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key20 UNIQUE (email);


--
-- Name: employees employees_email_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key21 UNIQUE (email);


--
-- Name: employees employees_email_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key22 UNIQUE (email);


--
-- Name: employees employees_email_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key23 UNIQUE (email);


--
-- Name: employees employees_email_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key24 UNIQUE (email);


--
-- Name: employees employees_email_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key25 UNIQUE (email);


--
-- Name: employees employees_email_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key26 UNIQUE (email);


--
-- Name: employees employees_email_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key27 UNIQUE (email);


--
-- Name: employees employees_email_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key28 UNIQUE (email);


--
-- Name: employees employees_email_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key29 UNIQUE (email);


--
-- Name: employees employees_email_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key3 UNIQUE (email);


--
-- Name: employees employees_email_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key30 UNIQUE (email);


--
-- Name: employees employees_email_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key31 UNIQUE (email);


--
-- Name: employees employees_email_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key32 UNIQUE (email);


--
-- Name: employees employees_email_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key33 UNIQUE (email);


--
-- Name: employees employees_email_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key34 UNIQUE (email);


--
-- Name: employees employees_email_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key35 UNIQUE (email);


--
-- Name: employees employees_email_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key36 UNIQUE (email);


--
-- Name: employees employees_email_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key37 UNIQUE (email);


--
-- Name: employees employees_email_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key38 UNIQUE (email);


--
-- Name: employees employees_email_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key39 UNIQUE (email);


--
-- Name: employees employees_email_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key4 UNIQUE (email);


--
-- Name: employees employees_email_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key40 UNIQUE (email);


--
-- Name: employees employees_email_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key41 UNIQUE (email);


--
-- Name: employees employees_email_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key42 UNIQUE (email);


--
-- Name: employees employees_email_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key43 UNIQUE (email);


--
-- Name: employees employees_email_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key44 UNIQUE (email);


--
-- Name: employees employees_email_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key45 UNIQUE (email);


--
-- Name: employees employees_email_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key46 UNIQUE (email);


--
-- Name: employees employees_email_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key47 UNIQUE (email);


--
-- Name: employees employees_email_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key48 UNIQUE (email);


--
-- Name: employees employees_email_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key49 UNIQUE (email);


--
-- Name: employees employees_email_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key5 UNIQUE (email);


--
-- Name: employees employees_email_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key50 UNIQUE (email);


--
-- Name: employees employees_email_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key51 UNIQUE (email);


--
-- Name: employees employees_email_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key52 UNIQUE (email);


--
-- Name: employees employees_email_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key53 UNIQUE (email);


--
-- Name: employees employees_email_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key54 UNIQUE (email);


--
-- Name: employees employees_email_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key55 UNIQUE (email);


--
-- Name: employees employees_email_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key56 UNIQUE (email);


--
-- Name: employees employees_email_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key57 UNIQUE (email);


--
-- Name: employees employees_email_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key58 UNIQUE (email);


--
-- Name: employees employees_email_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key59 UNIQUE (email);


--
-- Name: employees employees_email_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key6 UNIQUE (email);


--
-- Name: employees employees_email_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key60 UNIQUE (email);


--
-- Name: employees employees_email_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key61 UNIQUE (email);


--
-- Name: employees employees_email_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key62 UNIQUE (email);


--
-- Name: employees employees_email_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key63 UNIQUE (email);


--
-- Name: employees employees_email_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key64 UNIQUE (email);


--
-- Name: employees employees_email_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key65 UNIQUE (email);


--
-- Name: employees employees_email_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key66 UNIQUE (email);


--
-- Name: employees employees_email_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key67 UNIQUE (email);


--
-- Name: employees employees_email_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key68 UNIQUE (email);


--
-- Name: employees employees_email_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key69 UNIQUE (email);


--
-- Name: employees employees_email_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key7 UNIQUE (email);


--
-- Name: employees employees_email_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key70 UNIQUE (email);


--
-- Name: employees employees_email_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key71 UNIQUE (email);


--
-- Name: employees employees_email_key72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key72 UNIQUE (email);


--
-- Name: employees employees_email_key73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key73 UNIQUE (email);


--
-- Name: employees employees_email_key74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key74 UNIQUE (email);


--
-- Name: employees employees_email_key75; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key75 UNIQUE (email);


--
-- Name: employees employees_email_key76; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key76 UNIQUE (email);


--
-- Name: employees employees_email_key77; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key77 UNIQUE (email);


--
-- Name: employees employees_email_key78; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key78 UNIQUE (email);


--
-- Name: employees employees_email_key79; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key79 UNIQUE (email);


--
-- Name: employees employees_email_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key8 UNIQUE (email);


--
-- Name: employees employees_email_key80; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key80 UNIQUE (email);


--
-- Name: employees employees_email_key81; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key81 UNIQUE (email);


--
-- Name: employees employees_email_key82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key82 UNIQUE (email);


--
-- Name: employees employees_email_key83; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key83 UNIQUE (email);


--
-- Name: employees employees_email_key84; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key84 UNIQUE (email);


--
-- Name: employees employees_email_key85; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key85 UNIQUE (email);


--
-- Name: employees employees_email_key86; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key86 UNIQUE (email);


--
-- Name: employees employees_email_key87; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key87 UNIQUE (email);


--
-- Name: employees employees_email_key88; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key88 UNIQUE (email);


--
-- Name: employees employees_email_key89; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key89 UNIQUE (email);


--
-- Name: employees employees_email_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key9 UNIQUE (email);


--
-- Name: employees employees_email_key90; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key90 UNIQUE (email);


--
-- Name: employees employees_email_key91; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key91 UNIQUE (email);


--
-- Name: employees employees_email_key92; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key92 UNIQUE (email);


--
-- Name: employees employees_email_key93; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key93 UNIQUE (email);


--
-- Name: employees employees_email_key94; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key94 UNIQUE (email);


--
-- Name: employees employees_email_key95; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key95 UNIQUE (email);


--
-- Name: employees employees_email_key96; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key96 UNIQUE (email);


--
-- Name: employees employees_email_key97; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key97 UNIQUE (email);


--
-- Name: employees employees_email_key98; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key98 UNIQUE (email);


--
-- Name: employees employees_email_key99; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key99 UNIQUE (email);


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- Name: entries entries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entries
    ADD CONSTRAINT entries_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: turnstiles turnstiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.turnstiles
    ADD CONSTRAINT turnstiles_pkey PRIMARY KEY (id);


--
-- Name: typeCards typeCards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."typeCards"
    ADD CONSTRAINT "typeCards_pkey" PRIMARY KEY (id);


--
-- Name: users users_ci_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key UNIQUE (ci);


--
-- Name: users users_ci_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key1 UNIQUE (ci);


--
-- Name: users users_ci_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key10 UNIQUE (ci);


--
-- Name: users users_ci_key100; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key100 UNIQUE (ci);


--
-- Name: users users_ci_key101; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key101 UNIQUE (ci);


--
-- Name: users users_ci_key102; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key102 UNIQUE (ci);


--
-- Name: users users_ci_key103; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key103 UNIQUE (ci);


--
-- Name: users users_ci_key104; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key104 UNIQUE (ci);


--
-- Name: users users_ci_key105; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key105 UNIQUE (ci);


--
-- Name: users users_ci_key106; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key106 UNIQUE (ci);


--
-- Name: users users_ci_key107; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key107 UNIQUE (ci);


--
-- Name: users users_ci_key108; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key108 UNIQUE (ci);


--
-- Name: users users_ci_key109; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key109 UNIQUE (ci);


--
-- Name: users users_ci_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key11 UNIQUE (ci);


--
-- Name: users users_ci_key110; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key110 UNIQUE (ci);


--
-- Name: users users_ci_key111; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key111 UNIQUE (ci);


--
-- Name: users users_ci_key112; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key112 UNIQUE (ci);


--
-- Name: users users_ci_key113; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key113 UNIQUE (ci);


--
-- Name: users users_ci_key114; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key114 UNIQUE (ci);


--
-- Name: users users_ci_key115; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key115 UNIQUE (ci);


--
-- Name: users users_ci_key116; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key116 UNIQUE (ci);


--
-- Name: users users_ci_key117; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key117 UNIQUE (ci);


--
-- Name: users users_ci_key118; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key118 UNIQUE (ci);


--
-- Name: users users_ci_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key12 UNIQUE (ci);


--
-- Name: users users_ci_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key13 UNIQUE (ci);


--
-- Name: users users_ci_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key14 UNIQUE (ci);


--
-- Name: users users_ci_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key15 UNIQUE (ci);


--
-- Name: users users_ci_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key16 UNIQUE (ci);


--
-- Name: users users_ci_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key17 UNIQUE (ci);


--
-- Name: users users_ci_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key18 UNIQUE (ci);


--
-- Name: users users_ci_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key19 UNIQUE (ci);


--
-- Name: users users_ci_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key2 UNIQUE (ci);


--
-- Name: users users_ci_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key20 UNIQUE (ci);


--
-- Name: users users_ci_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key21 UNIQUE (ci);


--
-- Name: users users_ci_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key22 UNIQUE (ci);


--
-- Name: users users_ci_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key23 UNIQUE (ci);


--
-- Name: users users_ci_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key24 UNIQUE (ci);


--
-- Name: users users_ci_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key25 UNIQUE (ci);


--
-- Name: users users_ci_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key26 UNIQUE (ci);


--
-- Name: users users_ci_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key27 UNIQUE (ci);


--
-- Name: users users_ci_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key28 UNIQUE (ci);


--
-- Name: users users_ci_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key29 UNIQUE (ci);


--
-- Name: users users_ci_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key3 UNIQUE (ci);


--
-- Name: users users_ci_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key30 UNIQUE (ci);


--
-- Name: users users_ci_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key31 UNIQUE (ci);


--
-- Name: users users_ci_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key32 UNIQUE (ci);


--
-- Name: users users_ci_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key33 UNIQUE (ci);


--
-- Name: users users_ci_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key34 UNIQUE (ci);


--
-- Name: users users_ci_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key35 UNIQUE (ci);


--
-- Name: users users_ci_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key36 UNIQUE (ci);


--
-- Name: users users_ci_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key37 UNIQUE (ci);


--
-- Name: users users_ci_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key38 UNIQUE (ci);


--
-- Name: users users_ci_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key39 UNIQUE (ci);


--
-- Name: users users_ci_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key4 UNIQUE (ci);


--
-- Name: users users_ci_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key40 UNIQUE (ci);


--
-- Name: users users_ci_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key41 UNIQUE (ci);


--
-- Name: users users_ci_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key42 UNIQUE (ci);


--
-- Name: users users_ci_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key43 UNIQUE (ci);


--
-- Name: users users_ci_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key44 UNIQUE (ci);


--
-- Name: users users_ci_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key45 UNIQUE (ci);


--
-- Name: users users_ci_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key46 UNIQUE (ci);


--
-- Name: users users_ci_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key47 UNIQUE (ci);


--
-- Name: users users_ci_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key48 UNIQUE (ci);


--
-- Name: users users_ci_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key49 UNIQUE (ci);


--
-- Name: users users_ci_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key5 UNIQUE (ci);


--
-- Name: users users_ci_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key50 UNIQUE (ci);


--
-- Name: users users_ci_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key51 UNIQUE (ci);


--
-- Name: users users_ci_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key52 UNIQUE (ci);


--
-- Name: users users_ci_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key53 UNIQUE (ci);


--
-- Name: users users_ci_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key54 UNIQUE (ci);


--
-- Name: users users_ci_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key55 UNIQUE (ci);


--
-- Name: users users_ci_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key56 UNIQUE (ci);


--
-- Name: users users_ci_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key57 UNIQUE (ci);


--
-- Name: users users_ci_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key58 UNIQUE (ci);


--
-- Name: users users_ci_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key59 UNIQUE (ci);


--
-- Name: users users_ci_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key6 UNIQUE (ci);


--
-- Name: users users_ci_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key60 UNIQUE (ci);


--
-- Name: users users_ci_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key61 UNIQUE (ci);


--
-- Name: users users_ci_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key62 UNIQUE (ci);


--
-- Name: users users_ci_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key63 UNIQUE (ci);


--
-- Name: users users_ci_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key64 UNIQUE (ci);


--
-- Name: users users_ci_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key65 UNIQUE (ci);


--
-- Name: users users_ci_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key66 UNIQUE (ci);


--
-- Name: users users_ci_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key67 UNIQUE (ci);


--
-- Name: users users_ci_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key68 UNIQUE (ci);


--
-- Name: users users_ci_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key69 UNIQUE (ci);


--
-- Name: users users_ci_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key7 UNIQUE (ci);


--
-- Name: users users_ci_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key70 UNIQUE (ci);


--
-- Name: users users_ci_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key71 UNIQUE (ci);


--
-- Name: users users_ci_key72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key72 UNIQUE (ci);


--
-- Name: users users_ci_key73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key73 UNIQUE (ci);


--
-- Name: users users_ci_key74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key74 UNIQUE (ci);


--
-- Name: users users_ci_key75; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key75 UNIQUE (ci);


--
-- Name: users users_ci_key76; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key76 UNIQUE (ci);


--
-- Name: users users_ci_key77; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key77 UNIQUE (ci);


--
-- Name: users users_ci_key78; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key78 UNIQUE (ci);


--
-- Name: users users_ci_key79; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key79 UNIQUE (ci);


--
-- Name: users users_ci_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key8 UNIQUE (ci);


--
-- Name: users users_ci_key80; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key80 UNIQUE (ci);


--
-- Name: users users_ci_key81; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key81 UNIQUE (ci);


--
-- Name: users users_ci_key82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key82 UNIQUE (ci);


--
-- Name: users users_ci_key83; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key83 UNIQUE (ci);


--
-- Name: users users_ci_key84; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key84 UNIQUE (ci);


--
-- Name: users users_ci_key85; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key85 UNIQUE (ci);


--
-- Name: users users_ci_key86; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key86 UNIQUE (ci);


--
-- Name: users users_ci_key87; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key87 UNIQUE (ci);


--
-- Name: users users_ci_key88; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key88 UNIQUE (ci);


--
-- Name: users users_ci_key89; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key89 UNIQUE (ci);


--
-- Name: users users_ci_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key9 UNIQUE (ci);


--
-- Name: users users_ci_key90; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key90 UNIQUE (ci);


--
-- Name: users users_ci_key91; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key91 UNIQUE (ci);


--
-- Name: users users_ci_key92; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key92 UNIQUE (ci);


--
-- Name: users users_ci_key93; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key93 UNIQUE (ci);


--
-- Name: users users_ci_key94; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key94 UNIQUE (ci);


--
-- Name: users users_ci_key95; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key95 UNIQUE (ci);


--
-- Name: users users_ci_key96; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key96 UNIQUE (ci);


--
-- Name: users users_ci_key97; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key97 UNIQUE (ci);


--
-- Name: users users_ci_key98; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key98 UNIQUE (ci);


--
-- Name: users users_ci_key99; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key99 UNIQUE (ci);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: visits visits_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT visits_pkey PRIMARY KEY (id);


--
-- Name: Externals Externals_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Externals"
    ADD CONSTRAINT "Externals_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: cards cards_typeCardId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT "cards_typeCardId_fkey" FOREIGN KEY ("typeCardId") REFERENCES public."typeCards"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: cards cards_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT "cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: employees employees_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "employees_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: employees employees_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "employees_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: entries entries_turnstileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entries
    ADD CONSTRAINT "entries_turnstileId_fkey" FOREIGN KEY ("turnstileId") REFERENCES public.turnstiles(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: entries entries_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entries
    ADD CONSTRAINT "entries_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: visits visits_externalId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT "visits_externalId_fkey" FOREIGN KEY ("externalId") REFERENCES public."Externals"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

