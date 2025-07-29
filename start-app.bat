@echo off
cd /d "C:\Users\b2b\my-buom-app"
echo Starting retirement calculator app...
echo.
echo Environment check:
if exist .env.local (
    echo ✓ Environment file found
) else (
    echo Creating environment file...
    echo VITE_SUPABASE_URL=https://yacaebicwatkntvvobsn.supabase.co > .env.local
    echo VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhY2FlYmljd2F0a250dnZvYnNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MTI2NjMsImV4cCI6MjA2OTI4ODY2M30.opm419ZQV_6BlJA-ArexehJM-n-Rhkpbjk-z6KIcDO8 >> .env.local
    echo ✓ Environment file created
)
echo.
echo Starting development server...
npm run dev
pause
