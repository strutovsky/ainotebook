from fastapi import FastAPI, status
import uvicorn

app = FastAPI(title="AiNotebook server")


@app.get("/", status_code=status.HTTP_200_OK)
async def root():
    return status.HTTP_200_OK


if __name__ == "__main__":
    uvicorn.run(app, debug=False, host='0.0.0.0', log_level="info")
