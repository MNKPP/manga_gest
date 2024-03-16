import argon2 from 'argon2';
import db from '../models/index.js';
import {MemberDto} from "../dto/member.dto.js";

const memberService = {

    login: async () => {
        throw new Error('Not implemented');
    },

    register: async (actorData) => {
        const pwdHash = await argon2.hash(actorData.password)

        const modifiedActorData = {
            ...actorData,
            password: pwdHash
        };

        const member = await db.Member.create(modifiedActorData);

        return new MemberDto(member);
    },

    checkEmail: async (email) => {
        throw new Error('Not implemented');
    }
}

export default memberService;