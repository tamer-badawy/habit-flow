import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from backend.database.session import async_engine
from backend.routers import auth
from backend.routers import habit

from backend.models.user import User, User_Refresh_Token
from backend.models.habit import Habit
from backend.models.log import Log


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 HabitFlow API service waking up...")
    yield
    await async_engine.dispose()
    print("🛑 Database engine connection pool safely dissolved.")



app = FastAPI(
    lifespan= lifespan,
    title= "HapitFlow API",
    description= "Production-grade full-stack habit tracking engine",
    version= "1.0.0"
)

app.add_middleware (
    CORSMiddleware,
    allow_origins= ["http://localhost:5173"],
    allow_credentials= True,
    allow_headers= ["*"],
    allow_methods= ["*"],
)

app.include_router(auth.router)
app.include_router(habit.router)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc: RequestValidationError):
    custom_messages = {
        "missing": "{loc} is required",
        "too_short": "{loc} should have be least {min_length} in length",
        "string_too_long": "{loc} should be at most {max_length} in length",
    }
    for error in exc.errors():
        formats = dict()
        if error["type"] != "value_error":
            loc = error["loc"][1] if error["loc"][0] in ("body", "path", "query") else error["loc"][0]
            formats = {"loc": loc.replace("_", " ").title()}
        else:
            error["msg"] = error["msg"].removeprefix("Value error, ")
        ctx = error.get("ctx")
        if ctx:
            formats.update(** ctx)
        message = custom_messages.get(error["type"])
        if message:
            error["msg"] = message.format(**formats)


    return JSONResponse(status_code= 422, content= {"detail": jsonable_encoder(exc.errors())})

@app.get("/", tags=["Root"])
async def root():
    return {"status": "online", "message": "Welcome to HabitFlow wrokspace engine"}

if __name__ == "__main__":
    uvicorn.run("main:app", port= 8000, log_level= "info", reload= True)