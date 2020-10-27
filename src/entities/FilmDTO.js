export default class FilmDTO {
  constructor (data={}){
    this.id = data.id || null
    this.title = data.name || null
    this.genre = data.genre || []
    this.artworks = data.artworks || []
    this.cast = data.cast || []
    this.length = data.length || null
    this.rating = data.rating || 'G'
    this.trailer = data.trailer || null
    this.writer = data.writer || []
    this.directors = data.directors || []
    this.releaseDate = data.release_date || null
    this.synopsis = data.synopsis || null
    this.language = data.language || null
  }

  getFilmGenre() {
    const str = this.genre.length > 0 
      ? this.genre.reduce((acc, genre) => `${acc}${genre}, `, '')
      : null
    return str ? str.slice(0, -2) : null
  }

  getFilmBanner() {
    return this.artworks.length > 0 
      ? this.artworks[0].picture 
      : 'null'
  }

  getFilmCast() {
    const str = this.cast.length > 0 
      ? this.cast.reduce((acc, cast) => `${acc}${cast}, `, '')
      : null
    return str ? str.slice(0, -2) : null
  }

  getFilmDirector() {
    const str = this.directors.length > 0 
      ? this.directors.reduce((acc, director) => `${acc}${director}, `, '')
      : null
    return str ? str.slice(0, -2) : null
  }

  getFilmWriters() {
    const str = this.writer.length > 0 
      ? this.writer.reduce((acc, writer) => `${acc}${writer}, `, '')
      : null
    return str ? str.slice(0, -2) : null
  }

  getFilmYear() {
    return this.releaseDate ? this.releaseDate.split('-')[2] : null
  }
}
