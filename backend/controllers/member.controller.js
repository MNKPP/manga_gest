import memberService from "../services/member.service.js";

const authController = {
    // TODO: Implement the controllers
    login: async (req, res) => {
        throw new Error('Not implemented');
    },

    register: async (req, res) => {
        // TODO: It's a test, need a better implementation
         const member = await memberService.register(req.body)

        res.sendStatus(200);
    }
}

export default authController;