import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: String,
      generated: 'uuid',
    },
    tmdb_id: {
      type: 'int',
      nullable: true,
      unique: true,
    },
    title: {
      type: String,
    },
    year: {
      type: 'int',
    },
    likes: {
      type: 'int',
      default: 0,
      nullable: true,
    },
  },
});

export default Movie;
