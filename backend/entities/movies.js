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
  },
});

export default Movie;