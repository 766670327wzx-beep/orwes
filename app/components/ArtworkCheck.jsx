import {useRef, useState} from 'react';

export function ArtworkCheck() {
  const [artwork, setArtwork] = useState(null);
  const [width, setWidth] = useState('');
  const [status, setStatus] = useState('');
  const revision = useRef(0);

  async function inspect(event) {
    const current = ++revision.current;
    const file = event.target.files?.[0];
    setArtwork(null);
    setStatus('');
    if (!file) return;
    if (
      !['image/png', 'image/jpeg', 'image/webp'].includes(file.type) ||
      file.size > 20 * 1024 * 1024
    ) {
      setStatus('Choose a PNG, JPG or WebP file up to 20 MB.');
      return;
    }

    let image;
    try {
      setStatus('Reading artwork…');
      image = await createImageBitmap(file);
      if (revision.current === current) {
        setArtwork({
          name: file.name,
          width: image.width,
          height: image.height,
        });
        setStatus('');
      }
    } catch {
      if (revision.current === current)
        setStatus('This image could not be read. Export it again and retry.');
    } finally {
      image?.close();
    }
  }

  const mm = Number(width);
  const sized = artwork && Number.isFinite(mm) && mm > 0;
  return (
    <section className="art-check">
      <h2>Check your print file</h2>
      <p>Check the scale before ordering. Your file stays on this device.</p>
      <label>
        Sheet artwork <small>PNG, JPG or WebP · up to 20 MB</small>
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={inspect}
        />
      </label>
      <label>
        Intended print width (mm)
        <input
          type="number"
          min="0.1"
          step="any"
          placeholder="e.g. 300"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
      </label>
      <div aria-live="polite">
        {status && <p>{status}</p>}
        {artwork && (
          <>
            <strong>{artwork.name}</strong>
            <p>
              {artwork.width} × {artwork.height} pixels
            </p>
          </>
        )}
        {sized && (
          <p>
            At {mm} mm wide, your artwork will be{' '}
            {((artwork.height * mm) / artwork.width).toFixed(1)} mm tall at{' '}
            {Math.round((artwork.width * 25.4) / mm)} pixels per inch.
          </p>
        )}
      </div>
    </section>
  );
}
