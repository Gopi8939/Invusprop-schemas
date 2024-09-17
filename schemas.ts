Types of User 
import { Types } from "mongoose";

export default interface IUsers {
    _id: Types.ObjectId,
    name:string,
    phone: string,
    email: string,
    password:string,
    address:string,
    active: boolean,
    otp: string,
    otp_expire: string,
    otp_verfied: boolean,
    isAdmin: boolean,
    role_id?: Types.ObjectId,
    location?:{
        coordinates : [number, number],
        type?: { type: String, default: "Point" }
        name?: string
    },
    aadhaar_card_url?:string,
    profile_url?:string,
    borker_license_url?:string,
    status?: string,
    role_type?: string,
    approved_by?: Types.ObjectId,
    approved_date?: string
    reason?: string,
    set_password?: boolean,
    token?: number,    
}

Schema Of user
import  {Schema, model,} from 'mongoose'
import bcrypt from "bcryptjs"
import IUsers from '../type/user';

//Userschema
const UserSchema = new Schema<IUsers>({
    name: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    password:{
        type: String
    },
    set_password:{
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
    },
    otp_expire:{
        type: String
    },
    otp_verfied:{
        type: Boolean,
        default: false
    },
    address:{
        type: String
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    role_id:{
        type: Schema.Types.ObjectId,
        ref: "Role"
    },
    location: {
        coordinates : [Number, Number],
        name: String
    },
    aadhaar_card_url:{
        type: String
    },
    profile_url:{ 
        type:String
    },
    borker_license_url:{ 
        type:String
    },
    status:{
        type: String,
    },
    role_type: {
        type: String
    },
    reason: {
        type: String
    },
    token:{
        type: Number,
    },
    active:{
        type: Boolean,
        default: true
    }
},{timestamps: true})

UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (error: any) {
      return next(error);
    }
});

//creating a model
const User = model<IUsers>('User', UserSchema )
export default User

Type of Property 
import { Types } from "mongoose";

interface imagesType{
    url: string;
    room_type: string;
}

export default interface IProperty{
    title: string;
    property_type: Types.ObjectId;
    location:{
        coordinates : [number, number],
        type?: string,
        name?: string
    },
    bedroom: string;
    bathroom: string;
    furnishing_detail: string;
    property_status: string;
    room_detail?: string[];
    area_size: string;
    build_up_area?: string;
    amenities: Types.ObjectId[];
    appliance?: Types.ObjectId[];
    safety_security?: string[];
    accessibility?: Types.ObjectId[];
    facing_direction: string;
    description: string;
    availability_status: string;
    age_of_property: string;
    // video_url?: string;
    // thumbnail_image_url?: string;
    slider_image_urls?: imagesType[];
    ownership: string;
    selling_price: number;
    negatiable_price?: number;
    all_include_price: boolean;
    status: string;
    created_by: Types.ObjectId;
    updated_by: Types.ObjectId;
    possession_by: string
    active: boolean
    tax_govt_charge: boolean
    approved_by: Types.ObjectId;
    approved_at: string;
    reason?: string;
}


Schema of property
import { Types } from "mongoose";

interface imagesType{
    url: string;
    room_type: string;
}

export default interface IProperty{
    title: string;
    property_type: Types.ObjectId;
    location:{
        coordinates : [number, number],
        type?: string,
        name?: string
    },
    bedroom: string;
    bathroom: string;
    furnishing_detail: string;
    property_status: string;
    room_detail?: string[];
    area_size: string;
    build_up_area?: string;
    amenities: Types.ObjectId[];
    appliance?: Types.ObjectId[];
    safety_security?: string[];
    accessibility?: Types.ObjectId[];
    facing_direction: string;
    description: string;
    availability_status: string;
    age_of_property: string;
    // video_url?: string;
    // thumbnail_image_url?: string;
    slider_image_urls?: imagesType[];
    ownership: string;
    selling_price: number;
    negatiable_price?: number;
    all_include_price: boolean;
    status: string;
    created_by: Types.ObjectId;
    updated_by: Types.ObjectId;
    possession_by: string
    active: boolean
    tax_govt_charge: boolean
    approved_by: Types.ObjectId;
    approved_at: string;
    reason?: string;
}

Type of Ads
import { Types } from "mongoose"

export default interface IAds {
    titel : string
    ad_for : string //home page or feed
    from_date : string
    to_date : string
    property_id : Types.ObjectId
    tumbnail_image_url : string
    video_url? : string
    category: string
    status : string
    reason?: string
    // approved: boolean
    approved_by_id?: Types.ObjectId
    approved_at?: string
    created_by : Types.ObjectId
}

Ads of Schema
import  mongoose, {Schema, model} from 'mongoose'
import IAds from '../type/ad'

//Userschema
const AdSchema = new Schema<IAds>({
    titel:{
        type: String,
        required: true
    },
    ad_for:{
        type: String,
        required :true,
        // enum: ['home page', 'feed']
    },
    from_date: {
        type: String,
        required: true
    },
    to_date: {
        type: String,
        required: true
    },
    property_id : {
        type : Schema.Types.ObjectId,
        ref: "Property"
    },
    tumbnail_image_url : {
        type:String,
        required: true
    },
    video_url : {
        type:String
    },
    category: {
        type:String
    },
    status : {
        type:String,
        required: true
    },
    reason:{
        type: String,
    },
    approved_by_id: {
        type : Schema.Types.ObjectId,
        ref: "User"
    },
    approved_at: {
        type:String
    },
    created_by :{
        type : Schema.Types.ObjectId,
        ref: "User"
    },
    // approval: {
    //     type: Boolean,
    //     default: false
    // }
},{timestamps: true})

//creating a model
const Ad = model<IAds>('Ad', AdSchema )
export default Ad


Type of Amenities
import { Types } from "mongoose";

export default interface IAmenities{
    _id: Types.ObjectId
    title: string;
    status: string;
    category: string;
    created_by: Types.ObjectId;
    updated_by: Types.ObjectId;
}

Schema Amenities
import  {Schema, model,} from 'mongoose'
import IAmenities from '../type/amenities'

//Menuschema
const AmenitiesSchema = new Schema<IAmenities>({
    title: {
        type: String,
    },
    category:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
    created_by:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    updated_by:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true})

//creating a model
const Amenities = model<IAmenities>('Amenities', AmenitiesSchema )
export default Amenities

Type of Propert type
import { Types } from "mongoose";

export default interface IPropertyType{
    _id: Types.ObjectId
    name: string,
    status: string
    icon_url: string
    created_by: Types.ObjectId,
    updated_by: Types.ObjectId,
}

Schema for property type
import  {Schema, model,} from 'mongoose'
import IPropertyTypes from '../type/propertyType';

//PropertyTypesschema
const PropertyTypeSchema = new Schema<IPropertyTypes>({
    name: {
        type: String,
    },
    icon_url:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
    },
    created_by:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    updated_by:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true})

//creating a model
const PropertyType = model<IPropertyTypes>('PropertyTypes', PropertyTypeSchema )
export default PropertyType

Type for Role
import { Types } from "mongoose";

export default interface IRoles {
    _id: Types.ObjectId,
    name:string,
    created_by?: Types.ObjectId,
    updated_by?: Types.ObjectId
} 

Schema for role
import  {Schema, model,} from 'mongoose'
import bcrypt from "bcryptjs"
import IRoles from '../type/role';

//Roleschema
const RoleSchema = new Schema<IRoles>({
    name: {
        type: String,
    },
    created_by:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    updated_by:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true})

//creating a model
const Role = model<IRoles>('Role', RoleSchema )
export default Role

type for Menu
import { Types } from "mongoose";

export default interface IMenus {
    _id: Types.ObjectId,
    name:string,
    created_by: Types.ObjectId,
    updated_by: Types.ObjectId,
} 

Schema for menu
import  {Schema, model,} from 'mongoose'
import IMenus from '../type/menu';

//Menuschema
const MenuSchema = new Schema<IMenus>({
    name: {
        type: String,
    },
    created_by:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    updated_by:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true})

//creating a model
const Menu = model<IMenus>('Menu', MenuSchema )
export default Menu

Type for Role Menu
import { Types } from "mongoose";

export default interface IRoleMenus {
    _id: Types.ObjectId,
    role_id?: Types.ObjectId,
    menu_id?: Types.ObjectId,
    read: Boolean,
    create: Boolean,
    update: Boolean,
    delete: Boolean,
    created_by?: Types.ObjectId,
    updated_by?: Types.ObjectId,
}

Schema for Role menu
import  mongoose, {Schema, model,} from 'mongoose'
import bcrypt from "bcryptjs"
import IRoleMenus from '../type/roleMenu';

const RoleMenuSchema = new Schema<IRoleMenus>({
    role_id: {
        type: mongoose.Types.ObjectId,
        ref: "Role"
    },
    menu_id: {
        type: mongoose.Types.ObjectId,
        ref: "Menu"
    },
    read:{
        type: Boolean,
        default: false
    },
    create:{
        type: Boolean,
        default: false
    },
    update:{
        type: Boolean,
        default: false
    },
    delete:{
        type: Boolean,
        default: false
    },
    created_by:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    updated_by:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true})

//creating a model
const RoleMenu = model<IRoleMenus>('RoleMenu', RoleMenuSchema)
export default RoleMenu

Type for Notification
import { Types } from "mongoose";

export default interface IUserNoification{
    _id: Types.ObjectId,
    user_id: Types.ObjectId,
    title: string,
    read: boolean,
    message: string,
    status: string,
    messahe_data: string,
    send_by: string,
}

Type for Transaction
import { Types } from "mongoose";

export default interface IUserTransaction{
    _id: Types.ObjectId
    user_id: Types.ObjectId
    payment_for: string //ad or property visit or buy token
    payment_status: string // failed or success or pending
    token_id?: Types.ObjectId
    subscription_id?: Types.ObjectId
    agreement_id?: Types.ObjectId
    token?: string
    price : number
    payment_type?: string
    payment_date: string
    created_by: Types.ObjectId
    updated_by?: Types.ObjectId
    payment_id?: Types.ObjectId
}

Type for property enquires
import { Types } from "mongoose";

export default interface IUserPropertyEnquire{
    _id: Types.ObjectId
    user_id: Types.ObjectId
    property_id: Types.ObjectId
    price: string
    user_available_date: string[]
    book_property_date: string
    book_property_status: string
    book_cancel_date?: string
    visited: boolean
    employee_id: Types.ObjectId
    employee_status: string
    rate_broker: number
    rate_description: string
}

