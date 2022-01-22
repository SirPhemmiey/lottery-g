
import { Ticket, TicketDao, TicketStatus } from './TicketDao';
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

    model: Model<Document<Ticket>>;

    constructor(mongo: Connection) {
        this.model = mongo.model<Document<Ticket>>('Ticket', schema);
    }
    
    updateTicket(id: string, doc: Ticket): Promise<string> {

        throw new Error('Method not implemented.');
    }

    addTicket(doc: Ticket): Promise<string> {
        return this.model.create(doc).then(() => {
            return doc.id;
        });
    }

    async getTicketById(id: string): Promise<Ticket> {
        return this.model.findById(id).then((doc) => {
            if (!doc) {
                throw new Error('Ticket not found.');
            }
            return mapToMongoDoc<Ticket>(doc);
        });
    }

    getTickets(): Promise<Ticket[]> {
       return this.model.find().then((docs) => {
        return mapToMongoDocs<Ticket>(docs);
       });
    }
}