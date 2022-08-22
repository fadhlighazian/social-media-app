const Photo = (props) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img src={props.thumbnailUrl} alt='urlThumbnail' />
      <p>{props.title}</p>
    </div>
  );
};

export default Photo;
