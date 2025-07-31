import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async createUser(data: { email: string, password: string, name: string }): Promise<User> {
        const newUser = new this.userModel(data)
        return newUser.save();
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email });
    }

    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async userUpdate(userId: string, body: any): Promise<User | null> {
        const updateData: Partial<User> = {};

        if (body.name) updateData.name = body.name;
        if (body.email) updateData.email = body.email;
        if (body.password && body.password.trim() !== '') {
            const hashed = await bcrypt.hash(body.password, 10);
            updateData.password = hashed;
        }

        return await this.userModel.findByIdAndUpdate(userId, updateData, { new: true });
    }
}
