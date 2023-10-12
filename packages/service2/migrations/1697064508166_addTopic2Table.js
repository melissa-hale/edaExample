// migrations/{timestamp}-addTopic2Table.js

exports.up = (pgm) => {
    pgm.createTable("topic2", {
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
    pgm.dropTable("topic2");
  };
  