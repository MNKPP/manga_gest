export class EpisodeDto {

    constructor({id, watchedEpisode, totalEpisodes}) {
        this.id = id;
        this.watchedEpisode = watchedEpisode;
        this.totalEpisodes = totalEpisodes;
    }
}