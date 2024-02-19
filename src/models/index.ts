import mongoose, { mongo } from "mongoose";
const {Schema} = mongoose;

//define schemas
const CarScherma = new Schema({
    model:{
        type: String,
        maxlength: [15, "O modelo pode ter no máximo 15 caracteres"],
        unique: true,
        required: [true, "O modelo é obrigatório"]
    }
});

//define os schemas
const PersonSchema = new Schema ({
    name: {
        type: String,
        maxlength: [30, "O nome pode ter no máximo 30 caracteres"],
        unique: true,
        required: [true, "O nome é obrigatório"]
    }
});

//define os schemas
const PhoneSchema = new Schema ({
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person",
        required: [true, "A pessoa dona do telefone é obrigatória"],
        validate: {
            validator: async function (id:string) {
                const person = await Person.findById(id);
                return !!person; 
            },
            message: 'A pessoa fornecida não existe'
        },
    },
    number: {
        type: String,
        match: [/^[0-9]{11}$/, "O telefone deve ter exatamente 11 digitos"],
        required: [true, "O número é obrigatório"]
    }
});