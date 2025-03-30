from fastapi import FastAPI
from .routes import router
from .database import engine, Base
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

#only allow origins that are needed 
origins = [
    "http://localhost:5173",  # React frontend 
    "http://127.0.0.1:5173",  #in case 

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)
Base.metadata.create_all(bind=engine)  

app.include_router(router)