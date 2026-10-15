import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.database.session import async_engine
from backend.routers import auth

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



@app.get("/", tags=["Root"])
async def root():
    return {"status": "online", "message": "Welcome to HabitFlow wrokspace engine"}

if __name__ == "__main__":
    uvicorn.run("main:app", port= 8000, log_level= "info", reload= True)