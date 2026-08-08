# ten-days-in-istanbul

A tiny, mission-based Turkish survival panel for a short stay in Istanbul.

Built from the layout ideas of `esponyol-inator`, but organized around real tasks rather than a general language curriculum.

## MVP missions

- Get home from the airport
- Buy groceries
- Order and explore food
- Navigate Istanbul
- Get a MacBook repaired

## Run locally

This is a zero-dependency static site. From the repository root:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

The phrase data lives in `config/missions.json` and can be edited without touching the UI code.
