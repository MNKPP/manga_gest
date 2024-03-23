import argon2 from 'argon2';
import db from '../models/index.js';
import { MemberDto } from "../dto/member.dto.js";

const memberService = {

    login: async ({username, password}) => {
        const member = await db.Member.findOne({ where: { username } });

        if (!member) {
            throw new Error('Invalid username or password');
        }

        const isPasswordValid = await argon2.verify(member.password, password);

        if (!isPasswordValid) {
            throw new Error('Invalid username or password');
        }

        return new MemberDto(member);
    },

    register: async ({username, email, password}) => {
        const pwdHash = await argon2.hash(password)

        const modifiedActorData = {
            username,
            email,
            password: pwdHash
        };

        const member = await db.Member.create(modifiedActorData);

        return new MemberDto(member);
    },

    checkEmail: async (email) => {
        return await db.Member.findOne({ where: { email }});
    }
}

export default memberService;