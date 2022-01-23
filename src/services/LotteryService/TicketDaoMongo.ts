
import { Ticket, TicketDao, TicketExtended, TicketStatus } from './TicketDao';
import { Schema, Document, Model, Connection, Types } from 'mongoose';
import { mapToMongoDoc, mapToMongoDocs } from '../../utils/mongoUtils';

const schema = new Schema(
    {
        status: {        
            type: Schema.Types.String,
            enum: Object.values(TicketStatus),
            default: TicketStatus.NotChecked,
        },
        lines: [Schema.Types.Mixed]
    },
    {
        timestamps: false,
        versionKey: false,
    },
);

export class TicketDaoMongo implements TicketDao {

    model: Model<Document<TicketExtended>>;

    constructor(mongo: Connection) {
        this.model = mongo.model<Document<TicketExtended>>('Ticket', schema);
    }

    exists(id: string): Promise<boolean> {
        return this.model.exists({_id: id}).then((value) => {
            return value;
        });
    }
    
    updateTicket(id: string, doc: Ticket): Promise<string> {
        return this.model.findByIdAndUpdate(id, {
            $set: doc as any
        }).then(() => {
            return id;
        });
    }

    addTicket(doc: Ticket): Promise<string> {
        return this.model.create(doc).then((newDoc) => {
            return newDoc.id;
        });
    }

    async getTicketById(id: string): Promise<TicketExtended> {
        return this.model.findOne({_id: id}).then((doc) => {
            if (!doc) {
                throw new Error('Ticket not found.');
            }
            return mapToMongoDoc<TicketExtended>(doc);
        });
    }

    getTickets(): Promise<TicketExtended[]> {
       return this.model.find().then((docs) => {
        return mapToMongoDocs<TicketExtended>(docs);
       });
    }

    deleteAll(): Promise<void> {
        return this.model.deleteMany({}).then(() => {
            return;
        })
    }
}