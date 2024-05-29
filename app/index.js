import  express  from "express";
import cookieParser from 'cookie-parser';
//Fix para __direname
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import {methods as authentication} from "./controllers/authentication.controller.js"
import {methods as authorization} from "./middlewares/authorization.js";
import  bodyParser  from "body-parser";
import morgan from 'morgan'
//Server
const app = express();

const pagesPath = path.join(fileURLToPath(import.meta.url), '...', 'pages');
app.use(morgan('dev'))
app.set("port",4000);
//app.set('pages', pagesPath);
//app.set('pages', path.join(__dirname, 'pages'));

// Configurar body-parser para manejar datos de formularios
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configuración
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/admin', express.static(path.join(__dirname, 'admin')));
app.use(express.json());
app.use(cookieParser());



//Rutas
app.get("/",authorization.soloPublico, (req,res)=> res.sendFile(__dirname + "/pages/login.html"));
app.get("/register",authorization.soloAdmin,(req,res)=> res.sendFile(__dirname + "/pages/login.html"));
app.get("/admin",authorization.soloAdmin,(req,res)=> res.sendFile(path.join(__dirname, 'public',"../pages/admin/index.html")));
app.post("/api/login",authentication.login);
app.post("/api/register",authentication.register);
app.post("/api/adduser",database.adduser);
app.post("/api/finduser",database.finduser);

app.listen(app.get("port"));
console.log("Servidor corriendo en puerto",app.get("port"));