// Arma un collage de imágenes a partir de los juegos incluidos en el paquete.
// Se ajusta solo sin importar cuántos juegos tenga (1, 2, 3, 4, 5...).
export default function PackageCollage({ juegos, fallbackImage, alt, className = "" }) {
  if (!juegos || juegos.length === 0) {
    return (
      <img
        src={fallbackImage}
        alt={alt}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  const n = juegos.length;
  const cols = Math.ceil(Math.sqrt(n));

  return (
    <div
      className={`grid h-full w-full gap-[2px] bg-slate-950 ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {juegos.map((juego) => (
        <img
          key={juego.titulo}
          src={juego.imagen}
          alt={juego.titulo}
          className="h-full w-full object-cover"
        />
      ))}
    </div>
  );
}
