import {useState} from 'react';
export function SheetPlanner() {
  const [files, setFiles] = useState([]),
    [columns, setColumns] = useState(3),
    [message, setMessage] = useState('');
  async function load(event) {
    const selected = Array.from(event.target.files || []);
    if (
      selected.some(
        (f) => !['image/png', 'image/jpeg', 'image/webp'].includes(f.type),
      ) ||
      selected.length > 24 ||
      selected.reduce((sum, f) => sum + f.size, 0) > 20 * 1024 * 1024
    ) {
      setMessage(
        'Choose up to 24 PNG, JPG or WebP files, totalling 20 MB or less.',
      );
      return;
    }
    try {
      const images = await Promise.all(
        selected.map(
          (file) =>
            new Promise((resolve, reject) => {
              const r = new FileReader();
              r.onload = () => resolve(String(r.result));
              r.onerror = reject;
              r.readAsDataURL(file);
            }),
        ),
      );
      setFiles(images);
      setMessage('');
    } catch {
      setMessage('Could not open the selected artwork.');
    }
  }
  function save() {
    const size = 180,
      rows = Math.ceil(files.length / columns);
    const shapes = files
      .map(
        (src, i) =>
          '<image x="' +
          ((i % columns) * size + 4) +
          '" y="' +
          (Math.floor(i / columns) * size + 4) +
          '" width="172" height="172" href="' +
          src +
          '"/>',
      )
      .join('');
    const blob = new Blob(
      [
        '<svg xmlns="http://www.w3.org/2000/svg" width="' +
          columns * size +
          '" height="' +
          rows * size +
          '">' +
          shapes +
          '</svg>',
      ],
      {type: 'image/svg+xml'},
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'artwork-layout.svg';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <div className="sheet-planner">
      <h2>Plan your sheet</h2>
      <p>Arrange your artwork and download a layout proof.</p>
      <label>
        Artwork files
        <input
          type="file"
          multiple
          accept="image/png,image/jpeg,image/webp"
          onChange={load}
        />
      </label>
      <label>
        Columns{' '}
        <select
          value={columns}
          onChange={(e) => setColumns(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
      </label>
      {message && <p role="alert">{message}</p>}
      {!!files.length && (
        <>
          <div
            className="sheet-preview"
            style={{gridTemplateColumns: 'repeat(' + columns + ',1fr)'}}
          >
            {files.map((src, i) => (
              <img src={src} key={i} alt={'Artwork ' + (i + 1)} />
            ))}
          </div>
          <button className="print-btn" onClick={save}>
            Download layout
          </button>
        </>
      )}
    </div>
  );
}
