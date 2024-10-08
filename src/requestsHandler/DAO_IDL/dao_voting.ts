export type DaoVoting = {
  "version": "0.1.0",
  "name": "dao_voting",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "dao",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    {
      "name": "createProposal",
      "accounts": [
        {
          "name": "dao",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "proposal",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "uniqueId",
          "type": "u64"
        },
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "externalLink",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "options",
          "type": {
            "vec": "string"
          }
        }
      ]
    },
    {
      "name": "vote",
      "accounts": [
        {
          "name": "proposal",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "voter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "optionIndex",
          "type": "u8"
        }
      ]
    },
    {
      "name": "registerVoter",
      "accounts": [
        {
          "name": "dao",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "voter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "endProposal",
      "accounts": [
        {
          "name": "proposal",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "dao",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "proposalCount",
            "type": "u32"
          },
          {
            "name": "totalVoters",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "proposal",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u32"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "link",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "options",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "voteCounts",
            "type": {
              "vec": "u32"
            }
          },
          {
            "name": "totalVotes",
            "type": "u32"
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "finished",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "voter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "hasVoted",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "VotingEnded",
      "msg": "Voting has already ended for this proposal"
    },
    {
      "code": 6001,
      "name": "AlreadyVoted",
      "msg": "Voter has already cast their vote"
    },
    {
      "code": 6002,
      "name": "InvalidOptionCount",
      "msg": "Invalid number of options. Must be between 2 and 5."
    },
    {
      "code": 6003,
      "name": "InvalidOptionIndex",
      "msg": "Invalid option index"
    },
    {
      "code": 6004,
      "name": "VotingAlreadyEnded",
      "msg": "Voting has already ended"
    }
  ]
};

export const IDL: DaoVoting = {
  "version": "0.1.0",
  "name": "dao_voting",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "dao",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    {
      "name": "createProposal",
      "accounts": [
        {
          "name": "dao",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "proposal",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "uniqueId",
          "type": "u64"
        },
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "externalLink",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "options",
          "type": {
            "vec": "string"
          }
        }
      ]
    },
    {
      "name": "vote",
      "accounts": [
        {
          "name": "proposal",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "voter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "optionIndex",
          "type": "u8"
        }
      ]
    },
    {
      "name": "registerVoter",
      "accounts": [
        {
          "name": "dao",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "voter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "endProposal",
      "accounts": [
        {
          "name": "proposal",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "dao",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "proposalCount",
            "type": "u32"
          },
          {
            "name": "totalVoters",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "proposal",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u32"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "link",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "options",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "voteCounts",
            "type": {
              "vec": "u32"
            }
          },
          {
            "name": "totalVotes",
            "type": "u32"
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "finished",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "voter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "hasVoted",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "VotingEnded",
      "msg": "Voting has already ended for this proposal"
    },
    {
      "code": 6001,
      "name": "AlreadyVoted",
      "msg": "Voter has already cast their vote"
    },
    {
      "code": 6002,
      "name": "InvalidOptionCount",
      "msg": "Invalid number of options. Must be between 2 and 5."
    },
    {
      "code": 6003,
      "name": "InvalidOptionIndex",
      "msg": "Invalid option index"
    },
    {
      "code": 6004,
      "name": "VotingAlreadyEnded",
      "msg": "Voting has already ended"
    }
  ]
};
