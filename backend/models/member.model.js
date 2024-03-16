import { Sequelize, DataTypes } from 'sequelize';


export default  (sequelize) => {
    const Member = sequelize.define('Member',{
        username: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'Member',
        timestamps: true
    })

    return Member;
}