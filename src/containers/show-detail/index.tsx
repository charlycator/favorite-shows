import { useShow } from '../../hooks';

const ShowDetail = () => {
  const { selectedShow } = useShow();

  if (!selectedShow) return;

  const {
    imageUrl,
    plot,
    released,
    seasons,
    title } = selectedShow;

  return (
    <div>
      <div className="grid grid-cols-1 max-w-[300px] text-left">
        <p> Released on {released} </p>
        <p> {seasons} seasons </p>
        <img
          className="object-cover my-8"
          src={imageUrl}
          alt={`Poster of ${title}`}/>
        <p className="line-clamp-5 mb-12 md:mb-0"> {plot} </p>
      </div>
    </div>
  )
};

export default ShowDetail;