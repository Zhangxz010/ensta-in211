import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: String,
      generated: 'uuid',
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
    }
  },
});

export default Movie;