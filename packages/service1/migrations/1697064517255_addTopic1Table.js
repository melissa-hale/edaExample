// migrations/{timestamp}-addTopic1Table.js

exports.up = (pgm) => {
    pgm.createTable("topic1", {
      id: "id",
      event_data: { type: "jsonb", notNull: true },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
    });
  };
  
  exports.down = (pgm) => {
    pgm.dropTable("topic1");
  };
  