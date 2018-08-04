const bcrypt = require('bcrypt');

module.exports = (sequelize, DataType) => {
  const Users = sequelize.define(
    "Users",
    {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      googleId: {
        type: DataType.STRING,
        allowNull: true
      },
      image: {
        type: DataType.STRING,
        allowNull: true
      },
      displayName: {
        type: DataType.STRING,
        allowNull: true
      },
      email: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      password: {
        type: DataType.STRING,
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      message: {
        type: DataType.STRING,
        allowNull: true,
        validate: {
          notEmpty: false
        }
      },
      admin: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      hooks: {
        beforeCreate: user => {
          if(user.password) {
          const salt = bcrypt.genSaltSync();
          user.set("password", bcrypt.hashSync(user.password, salt));
          }
        }
      }
    }
  );

  Users.isPassword = (encodedPassword, password) =>
    bcrypt.compareSync(password, encodedPassword);

  const Enterprises = sequelize.define("Enterprises", {
    id: {
      type: DataType.STRING,
      primaryKey: true,
      autoIncrement: false
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataType.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    sector: {
      type: DataType.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    endDate: {
      type: DataType.DATEONLY,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    published: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    loan: {
      type: DataType.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    loanPurpose: {
      type: DataType.TEXT,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    business: {
      type: DataType.TEXT,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    beganOperating: {
      type: DataType.DATEONLY,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    paidEmployees: {
      type: DataType.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    ownershipStatus: {
      type: DataType.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    asset: {
      type: DataType.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    salesRevenue: {
      type: DataType.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    anualReport: {
      type: DataType.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    boardOfDirectors: {
      type: DataType.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    managementTeam: {
      type: DataType.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    impactStudy: {
      type: DataType.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    businessPlan: {
      type: DataType.TEXT,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    certificateIncorporation: {
      type: DataType.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    historicalFinancial: {
      type: DataType.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    YDTFinancial: {
      type: DataType.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    Region: {
      type: DataType.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    image1: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  const Evaluations = sequelize.define("Evaluations", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    OficialVote: {
      type: DataType.BOOLEAN,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    status: {
      type: DataType.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    inProgress: {
      type: DataType.BOOLEAN,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    impact: {
      type: DataType.STRING,
      allowNull: true,
    },
    model: {
      type: DataType.STRING,
      allowNull: true,
    },
    prioritization: {
      type: DataType.STRING,
      allowNull: true,
    },
    impactComment: {
      type: DataType.STRING,
      allowNull: true,
      validate: {
        notEmpty: false
      }
    },
    modelComment: {
      type: DataType.STRING,
      allowNull: true,
      validate: {
        notEmpty: false
      }
    },
    prioritizationComment: {
      type: DataType.STRING,
      allowNull: true,
      validate: {
        notEmpty: false
      }
    },
    comment: {
      type: DataType.STRING,
      allowNull: true,
      validate: {
        notEmpty: false
      }
    }
  });

  const Sectors = sequelize.define("Sectors", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  const Countries = sequelize.define("Countries", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  const Votes = sequelize.define("Votes", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    comment: {
      type: DataType.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    }
  });

  const Answers = sequelize.define("Answers", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: DataType.STRING,
      allowNull: true
    },
    score: {
      type: DataType.INTEGER,
      allowNull: true
    }
  });

  const Questions = sequelize.define("Questions", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: DataType.STRING,
      allowNull: true
    },
    name: {
      type: DataType.STRING,
      allowNull: true
    }
  });

  const Comments = sequelize.define("Comments", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    text: {
      type: DataType.STRING,
      allowNull: true
    },
    votes: {
      type: DataType.INTEGER,
      defaultValue: 0
    }
  });

  const Images = sequelize.define("Images", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    url: {
      type: DataType.STRING,
      allowNull: true
    }
  });

  const CommentVotes = sequelize.define("CommentVotes", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    votes: {
      type: DataType.INTEGER,
      allowNull: true
    }
  });


  const UsersSectors = sequelize.define("UsersSectors", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sector_id: {
      type: DataType.INTEGER,
    },
  });

  Questions.hasMany(Answers, { as: "Answers" });
  Votes.belongsTo(Questions);
  Votes.belongsTo(Answers);
  Votes.belongsTo(Evaluations);
  Evaluations.hasMany(Votes);
  Enterprises.hasMany(Evaluations, { as: "Evaluations" });
  Enterprises.hasMany(Images);
  Enterprises.belongsTo(Sectors);
  Enterprises.belongsTo(Countries);
  Enterprises.hasMany(Comments);
  Users.hasMany(Comments);
  Users.hasMany(Evaluations);
  Comments.hasMany(Comments, { as: "Replies" });
  Comments.hasMany(CommentVotes);
  Users.hasMany(CommentVotes);
  Users.hasMany(UsersSectors);

  return {
    name: "Enterprises",
    model: {
      Enterprises,
      Evaluations,
      Sectors,
      Votes,
      Questions,
      Answers,
      Comments,
      Users,
      Images,
      CommentVotes,
      UsersSectors,
      Countries
    }
  };
};
