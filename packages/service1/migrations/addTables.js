exports.up = (pgm) => {
    // topic1 table
    pgm.createTable("topic1", {
      id: "id",
      event_data: { type: "jsonb", notNull: true },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
    });
  
    // topic2 table
    pgm.createTable("topic2", {
      id: "id",
      event_data: { type: "jsonb", notNull: true },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
    });
  
    // topic3 table
    pgm.createTable("topic3", {
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
    pgm.dropTable("topic3");
    pgm.dropTable("topic2");
    pgm.dropTable("topic1");
  };