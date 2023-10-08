// youTubeVideo.tsx

export default function YouTubeVideo({ title, id }: { title: string, id: string }) {
  return (
    <div className="iframeVideoContainer">
      <iframe
        className="iframeVideo"
        loading="lazy"
        title={title}
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${id}?feature=oembed`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}>
      </iframe>
    </div>
  );
}