import typeorm from 'typeorm';

const Comment = new typeorm.EntitySchema({
  name: 'Comment',
  tableName: 'comments',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    tmdb_id: {
      type: 'int',
    },
    username: {
      type: 'varchar',
    },
    rating: {
      type: 'int',
    },
    content: {
      type: 'text',
    },
    created_at: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    },
  },
});

export default Comment;
