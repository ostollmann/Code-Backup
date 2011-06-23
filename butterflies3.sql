DROP TABLE IF EXISTS "auth_group";
CREATE TABLE "auth_group" (
    "id" integer NOT NULL PRIMARY KEY,
    "name" varchar(80) NOT NULL UNIQUE
);
DROP TABLE IF EXISTS "auth_group_permissions";
CREATE TABLE "auth_group_permissions" (
    "id" integer NOT NULL PRIMARY KEY,
    "group_id" integer NOT NULL,
    "permission_id" integer NOT NULL REFERENCES "auth_permission" ("id"),
    UNIQUE ("group_id", "permission_id")
);
DROP TABLE IF EXISTS "auth_message";
CREATE TABLE "auth_message" (
    "id" integer NOT NULL PRIMARY KEY,
    "user_id" integer NOT NULL REFERENCES "auth_user" ("id"),
    "message" text NOT NULL
);
DROP TABLE IF EXISTS "auth_permission";
CREATE TABLE "auth_permission" (
    "id" integer NOT NULL PRIMARY KEY,
    "name" varchar(50) NOT NULL,
    "content_type_id" integer NOT NULL,
    "codename" varchar(100) NOT NULL,
    UNIQUE ("content_type_id", "codename")
);
INSERT INTO "auth_permission" VALUES(1,'Can add permission',1,'add_permission');
INSERT INTO "auth_permission" VALUES(2,'Can change permission',1,'change_permission');
INSERT INTO "auth_permission" VALUES(3,'Can delete permission',1,'delete_permission');
INSERT INTO "auth_permission" VALUES(4,'Can add group',2,'add_group');
INSERT INTO "auth_permission" VALUES(5,'Can change group',2,'change_group');
INSERT INTO "auth_permission" VALUES(6,'Can delete group',2,'delete_group');
INSERT INTO "auth_permission" VALUES(7,'Can add user',3,'add_user');
INSERT INTO "auth_permission" VALUES(8,'Can change user',3,'change_user');
INSERT INTO "auth_permission" VALUES(9,'Can delete user',3,'delete_user');
INSERT INTO "auth_permission" VALUES(10,'Can add message',4,'add_message');
INSERT INTO "auth_permission" VALUES(11,'Can change message',4,'change_message');
INSERT INTO "auth_permission" VALUES(12,'Can delete message',4,'delete_message');
INSERT INTO "auth_permission" VALUES(13,'Can add content type',5,'add_contenttype');
INSERT INTO "auth_permission" VALUES(14,'Can change content type',5,'change_contenttype');
INSERT INTO "auth_permission" VALUES(15,'Can delete content type',5,'delete_contenttype');
INSERT INTO "auth_permission" VALUES(16,'Can add session',6,'add_session');
INSERT INTO "auth_permission" VALUES(17,'Can change session',6,'change_session');
INSERT INTO "auth_permission" VALUES(18,'Can delete session',6,'delete_session');
INSERT INTO "auth_permission" VALUES(19,'Can add site',7,'add_site');
INSERT INTO "auth_permission" VALUES(20,'Can change site',7,'change_site');
INSERT INTO "auth_permission" VALUES(21,'Can delete site',7,'delete_site');
INSERT INTO "auth_permission" VALUES(22,'Can add user',8,'add_user');
INSERT INTO "auth_permission" VALUES(23,'Can change user',8,'change_user');
INSERT INTO "auth_permission" VALUES(24,'Can delete user',8,'delete_user');
INSERT INTO "auth_permission" VALUES(25,'Can add pitch',9,'add_pitch');
INSERT INTO "auth_permission" VALUES(26,'Can change pitch',9,'change_pitch');
INSERT INTO "auth_permission" VALUES(27,'Can delete pitch',9,'delete_pitch');
INSERT INTO "auth_permission" VALUES(28,'Can add message',10,'add_message');
INSERT INTO "auth_permission" VALUES(29,'Can change message',10,'change_message');
INSERT INTO "auth_permission" VALUES(30,'Can delete message',10,'delete_message');
INSERT INTO "auth_permission" VALUES(31,'Can add log entry',11,'add_logentry');
INSERT INTO "auth_permission" VALUES(32,'Can change log entry',11,'change_logentry');
INSERT INTO "auth_permission" VALUES(33,'Can delete log entry',11,'delete_logentry');
DROP TABLE IF EXISTS "auth_user";
CREATE TABLE "auth_user" (
    "id" integer NOT NULL PRIMARY KEY,
    "username" varchar(30) NOT NULL UNIQUE,
    "first_name" varchar(30) NOT NULL,
    "last_name" varchar(30) NOT NULL,
    "email" varchar(75) NOT NULL,
    "password" varchar(128) NOT NULL,
    "is_staff" bool NOT NULL,
    "is_active" bool NOT NULL,
    "is_superuser" bool NOT NULL,
    "last_login" datetime NOT NULL,
    "date_joined" datetime NOT NULL
);
INSERT INTO "auth_user" VALUES(1,'ost','','','oliver@stollmann.net','sha1$de41d$e22d59c79995ec023db87af286dde83eb5040c3f',1,1,1,'2011-02-22 13:25:18.643579','2011-02-22 13:23:32.369212');
DROP TABLE IF EXISTS "auth_user_groups";
CREATE TABLE "auth_user_groups" (
    "id" integer NOT NULL PRIMARY KEY,
    "user_id" integer NOT NULL,
    "group_id" integer NOT NULL REFERENCES "auth_group" ("id"),
    UNIQUE ("user_id", "group_id")
);
DROP TABLE IF EXISTS "auth_user_user_permissions";
CREATE TABLE "auth_user_user_permissions" (
    "id" integer NOT NULL PRIMARY KEY,
    "user_id" integer NOT NULL,
    "permission_id" integer NOT NULL REFERENCES "auth_permission" ("id"),
    UNIQUE ("user_id", "permission_id")
);
DROP TABLE IF EXISTS "django_admin_log";
CREATE TABLE "django_admin_log" (
    "id" integer NOT NULL PRIMARY KEY,
    "action_time" datetime NOT NULL,
    "user_id" integer NOT NULL REFERENCES "auth_user" ("id"),
    "content_type_id" integer REFERENCES "django_content_type" ("id"),
    "object_id" text,
    "object_repr" varchar(200) NOT NULL,
    "action_flag" smallint unsigned NOT NULL,
    "change_message" text NOT NULL
);
INSERT INTO "django_admin_log" VALUES(1,'2011-02-22 13:26:00.503035',1,8,'1','ID: 1, Email:maxfisch@ethz.ch',1,'');
INSERT INTO "django_admin_log" VALUES(2,'2011-02-22 13:26:30.840746',1,8,'2','ID: 2, Email:chris@ziegler.de',1,'');
INSERT INTO "django_admin_log" VALUES(3,'2011-02-22 13:26:55.601261',1,8,'3','ID: 3, Email:oliver@stollmann.net',1,'');
INSERT INTO "django_admin_log" VALUES(4,'2011-02-22 13:27:24.740087',1,9,'1','ID: 1, User: ID: 3, Email: oliver@stollmann.net',1,'');
INSERT INTO "django_admin_log" VALUES(5,'2011-02-22 13:27:30.512837',1,9,'2','ID: 2, User: ID: 2, Email: chris@ziegler.de',1,'');
INSERT INTO "django_admin_log" VALUES(6,'2011-02-22 13:27:35.590585',1,9,'3','ID: 3, User: ID: 1, Email: maxfisch@ethz.ch',1,'');
INSERT INTO "django_admin_log" VALUES(7,'2011-02-22 13:27:51.168911',1,10,'1','ID: 1, User: ID: 1, Email: maxfisch@ethz.ch, Recipient: ID: 2, Email: chris@ziegler.de',1,'');
INSERT INTO "django_admin_log" VALUES(8,'2011-02-22 13:28:01.768768',1,10,'2','ID: 2, User: ID: 2, Email: chris@ziegler.de, Recipient: ID: 1, Email: maxfisch@ethz.ch',1,'');
DROP TABLE IF EXISTS "django_content_type";
CREATE TABLE "django_content_type" (
    "id" integer NOT NULL PRIMARY KEY,
    "name" varchar(100) NOT NULL,
    "app_label" varchar(100) NOT NULL,
    "model" varchar(100) NOT NULL,
    UNIQUE ("app_label", "model")
);
INSERT INTO "django_content_type" VALUES(1,'permission','auth','permission');
INSERT INTO "django_content_type" VALUES(2,'group','auth','group');
INSERT INTO "django_content_type" VALUES(3,'user','auth','user');
INSERT INTO "django_content_type" VALUES(4,'message','auth','message');
INSERT INTO "django_content_type" VALUES(5,'content type','contenttypes','contenttype');
INSERT INTO "django_content_type" VALUES(6,'session','sessions','session');
INSERT INTO "django_content_type" VALUES(7,'site','sites','site');
INSERT INTO "django_content_type" VALUES(8,'user','main','user');
INSERT INTO "django_content_type" VALUES(9,'pitch','main','pitch');
INSERT INTO "django_content_type" VALUES(10,'message','main','message');
INSERT INTO "django_content_type" VALUES(11,'log entry','admin','logentry');
DROP TABLE IF EXISTS "django_session";
CREATE TABLE "django_session" (
    "session_key" varchar(40) NOT NULL PRIMARY KEY,
    "session_data" text NOT NULL,
    "expire_date" datetime NOT NULL
);
INSERT INTO "django_session" VALUES('68135eff22bb87e021c97fee18fdea2f','gAJ9cQEoVRJfYXV0aF91c2VyX2JhY2tlbmRxAlUpZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5k
cy5Nb2RlbEJhY2tlbmRxA1UNX2F1dGhfdXNlcl9pZHEESwF1LjAzY2VhNzRhZDc4NWE3YjY5YmEw
Mjc2YmQ0Yjg5ZTAy
','2011-03-08 13:25:18.890892');
DROP TABLE IF EXISTS "django_site";
CREATE TABLE "django_site" (
    "id" integer NOT NULL PRIMARY KEY,
    "domain" varchar(100) NOT NULL,
    "name" varchar(50) NOT NULL
);
INSERT INTO "django_site" VALUES(1,'example.com','example.com');
DROP TABLE IF EXISTS "main_message";
CREATE TABLE "main_message" (
    "id" integer NOT NULL PRIMARY KEY,
    "user_id" integer NOT NULL REFERENCES "main_user" ("id"),
    "recipient_id" integer NOT NULL REFERENCES "main_user" ("id"),
    "record_date" datetime NOT NULL,
    "send_date" datetime NOT NULL,
    "receipt_date" datetime NOT NULL
);
INSERT INTO "main_message" VALUES(1,1,2,'2011-02-22 20:27:47','2011-02-22 20:27:48','2011-02-22 20:27:49');
INSERT INTO "main_message" VALUES(2,2,1,'2011-02-22 20:27:57','2011-02-22 20:27:58','2011-02-22 20:28:00');
DROP TABLE IF EXISTS "main_pitch";
CREATE TABLE "main_pitch" (
    "id" integer NOT NULL PRIMARY KEY,
    "user_id" integer NOT NULL REFERENCES "main_user" ("id"),
    "likes" integer NOT NULL,
    "record_date" datetime NOT NULL
);
INSERT INTO "main_pitch" VALUES(1,3,0,'2011-02-22 20:27:23');
INSERT INTO "main_pitch" VALUES(2,2,0,'2011-02-22 20:27:29');
INSERT INTO "main_pitch" VALUES(3,1,0,'2011-02-22 20:27:34');
DROP TABLE IF EXISTS "main_user";
CREATE TABLE "main_user" (
    "id" integer NOT NULL PRIMARY KEY,
    "username" varchar(100) NOT NULL,
    "password_hash" varchar(32) NOT NULL,
    "email" varchar(254) NOT NULL,
    "age" integer NOT NULL,
    "registration_date" datetime NOT NULL,
    "last_login_date" datetime NOT NULL
);
INSERT INTO "main_user" VALUES(1,'maxfisch','33878fa0eafced507ee4dbd0ab75c45f','maxfisch@ethz.ch',21,'2011-02-22 20:25:58','2011-02-22 20:25:58');
INSERT INTO "main_user" VALUES(2,'cziegler','9df22f196a33acd0b372fe502de51211','chris@ziegler.de',22,'2011-02-22 20:26:29','2011-02-22 20:26:29');
INSERT INTO "main_user" VALUES(3,'o1iver','d0cf705f201ddc526f49ba2e62392e21','oliver@stollmann.net',22,'2011-02-22 20:26:53','2011-02-22 20:26:53');
