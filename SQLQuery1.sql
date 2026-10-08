create database MusicStreaming;

use MusicStreaming;

CREATE TABLE Users
(
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    UserName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(200) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(MAX) NOT NULL,

    RoleName VARCHAR(20) NOT NULL
    CHECK(RoleName IN ('Admin','User')),

    TimeZoneId NVARCHAR(100) NULL,

    IsActive BIT NOT NULL DEFAULT(1),

    CreatedDate DATETIME NOT NULL DEFAULT(GETDATE()),
    UpdatedDate DATETIME NULL
);

CREATE TABLE Artists
(
    ArtistId INT IDENTITY(1,1) PRIMARY KEY,
    ArtistName NVARCHAR(200) NOT NULL,

    ImageUrl NVARCHAR(500) NOT NULL,

    CreatedBy INT NOT NULL,
    CreatedDate DATETIME DEFAULT(GETDATE()),

    FOREIGN KEY (CreatedBy)
    REFERENCES Users(UserId)
);

CREATE TABLE Albums
(
    AlbumId INT IDENTITY(1,1) PRIMARY KEY,

    Title NVARCHAR(200) NOT NULL,

    ArtistId INT NOT NULL,

    CoverImageUrl NVARCHAR(500) NOT NULL,

    ReleaseYear INT NOT NULL,

    CreatedBy INT NOT NULL,

    CreatedDate DATETIME DEFAULT(GETDATE()),

    FOREIGN KEY(ArtistId)
    REFERENCES Artists(ArtistId),

    FOREIGN KEY(CreatedBy)
    REFERENCES Users(UserId)
);

CREATE TABLE Genres
(
    GenreId INT PRIMARY KEY,
    GenreName VARCHAR(50)
);

INSERT INTO Genres VALUES
(1,'Pop'),
(2,'Rock'),
(3,'HipHop'),
(4,'Electronic'),
(5,'Classical');

CREATE TABLE Songs
(
    SongId INT IDENTITY(1,1) PRIMARY KEY,

    Title NVARCHAR(200) NOT NULL,

    AlbumId INT NOT NULL,

    ArtistId INT NOT NULL,

    DurationSeconds INT NOT NULL,

    GenreId INT NOT NULL,

    AudioFileUrl NVARCHAR(500) NULL,

    CreatedBy INT NOT NULL,

    CreatedDate DATETIME DEFAULT(GETDATE()),

    FOREIGN KEY(AlbumId)
    REFERENCES Albums(AlbumId),

    FOREIGN KEY(ArtistId)
    REFERENCES Artists(ArtistId),

    FOREIGN KEY(GenreId)
    REFERENCES Genres(GenreId),

    FOREIGN KEY(CreatedBy)
    REFERENCES Users(UserId)
);


CREATE TABLE Playlists
(
    PlaylistId INT IDENTITY(1,1) PRIMARY KEY,

    UserId INT NOT NULL,

    PlaylistName NVARCHAR(200) NOT NULL,

    CreatedDate DATETIME DEFAULT(GETDATE()),

    UpdatedDate DATETIME NULL,

    FOREIGN KEY(UserId)
    REFERENCES Users(UserId)
);

CREATE TABLE PlaylistSongs
(
    PlaylistSongId INT IDENTITY(1,1) PRIMARY KEY,

    PlaylistId INT NOT NULL,

    SongId INT NOT NULL,

    AddedDate DATETIME DEFAULT(GETDATE()),

    FOREIGN KEY(PlaylistId)
    REFERENCES Playlists(PlaylistId),

    FOREIGN KEY(SongId)
    REFERENCES Songs(SongId)
);

CREATE TABLE ErrorLogs
(
    ErrorLogId INT IDENTITY(1,1) PRIMARY KEY,

    ErrorMessage NVARCHAR(MAX),

    StackTrace NVARCHAR(MAX),

    Source NVARCHAR(500),

    UserId INT NULL,

    LoggedDate DATETIME DEFAULT(GETDATE())
);

go
CREATE or alter PROCEDURE SP_Auth
(
    @Action VARCHAR(20),
    @UserId INT = NULL,
    @UserName NVARCHAR(100) = NULL,
    @Email NVARCHAR(200) = NULL,
    @PasswordHash NVARCHAR(MAX) = NULL,
    @RoleName VARCHAR(20) = NULL
)
AS
BEGIN

    IF @Action='REGISTER'
    BEGIN

        INSERT INTO Users
        (
            UserName,
            Email,
            PasswordHash,
            RoleName
        )
        VALUES
        (
            @UserName,
            @Email,
            @PasswordHash,
            'User'
        )

    END

    ELSE IF @Action='LOGIN'
BEGIN

    SELECT
        UserId,
        UserName,
        Email,
        PasswordHash,
        RoleName
    FROM Users
    WHERE Email=@Email
    AND IsActive=1

END

END

go
CREATE or ALTER PROCEDURE SP_Artists_Get
(
    @ArtistId INT = NULL
)
AS
BEGIN

    IF @ArtistId IS NULL
    BEGIN

        SELECT
            ArtistId,
            ArtistName,
            ImageUrl
        FROM Artists

    END
    ELSE
    BEGIN

        SELECT
            ArtistId,
            ArtistName,
            ImageUrl
        FROM Artists
        WHERE ArtistId=@ArtistId

        SELECT
            AlbumId,
            Title,
            CoverImageUrl,
            ReleaseYear
        FROM Albums
        WHERE ArtistId=@ArtistId

    END

END

go
CREATE or alter PROCEDURE SP_Artist_Upsert
(
    @ArtistId INT = NULL,
    @ArtistName NVARCHAR(200),
    @ImageUrl NVARCHAR(500),
    @CreatedBy INT
)
AS
BEGIN TRY

    IF ISNULL(@ArtistId,0)=0
    BEGIN

        INSERT INTO Artists
        (
            ArtistName,
            ImageUrl,
            CreatedBy
        )
        VALUES
        (
            @ArtistName,
            @ImageUrl,
            @CreatedBy
        )

    END

END TRY

BEGIN CATCH

    INSERT INTO ErrorLogs
    (
        ErrorMessage,
        StackTrace,
        Source
    )
    VALUES
    (
        ERROR_MESSAGE(),
        ERROR_PROCEDURE(),
        'SP_Artist_Upsert'
    )

    --THROW

END CATCH

go
CREATE or ALTER PROCEDURE SP_Albums_Get
(
    @AlbumId INT=NULL
)
AS
BEGIN

    IF @AlbumId IS NULL
    BEGIN

        SELECT
            A.AlbumId,
            A.Title,
            A.ReleaseYear,
            A.CoverImageUrl,
            AR.ArtistName
        FROM Albums A
        INNER JOIN Artists AR
            ON A.ArtistId=AR.ArtistId

    END
    ELSE
    BEGIN

        SELECT
            A.AlbumId,
            A.Title,
            A.ReleaseYear,
            A.CoverImageUrl,
            AR.ArtistName
        FROM Albums A
        INNER JOIN Artists AR
            ON A.ArtistId=AR.ArtistId
        WHERE A.AlbumId=@AlbumId

        SELECT
            SongId,
            Title,
            DurationSeconds,
            GenreId
        FROM Songs
        WHERE AlbumId=@AlbumId

    END

END


CREATE PROCEDURE SP_Album_Upsert
(
    @AlbumId INT=NULL,
    @Title NVARCHAR(200),
    @ArtistId INT,
    @CoverImageUrl NVARCHAR(500),
    @ReleaseYear INT,
    @CreatedBy INT
)
AS
BEGIN TRY

    IF ISNULL(@AlbumId,0)=0
    BEGIN

        INSERT INTO Albums
        (
            Title,
            ArtistId,
            CoverImageUrl,
            ReleaseYear,
            CreatedBy
        )
        VALUES
        (
            @Title,
            @ArtistId,
            @CoverImageUrl,
            @ReleaseYear,
            @CreatedBy
        )

    END

END TRY

BEGIN CATCH

    INSERT INTO ErrorLogs
    (
        ErrorMessage,
        StackTrace,
        Source
    )
    VALUES
    (
        ERROR_MESSAGE(),
        ERROR_PROCEDURE(),
        'SP_Album_Upsert'
    )

    --THROW

END CATCH

CREATE PROCEDURE SP_Songs_Get
(
    @SongId INT=NULL,
    @GenreId INT=NULL,
    @Search NVARCHAR(100)=NULL
)
AS
BEGIN

SELECT
    S.SongId,
    S.Title,
    S.DurationSeconds,
    G.GenreName,
    A.Title AlbumName,
    AR.ArtistName
FROM Songs S

INNER JOIN Albums A
ON S.AlbumId=A.AlbumId

INNER JOIN Artists AR
ON S.ArtistId=AR.ArtistId

INNER JOIN Genres G
ON S.GenreId=G.GenreId

WHERE
(
 @SongId IS NULL
 OR S.SongId=@SongId
)

AND
(
 @GenreId IS NULL
 OR S.GenreId=@GenreId
)

AND
(
 @Search IS NULL
 OR S.Title LIKE '%'+@Search+'%'
)

END

CREATE PROCEDURE SP_Song_Upsert
(
    @SongId INT=NULL,
    @Title NVARCHAR(200),
    @AlbumId INT,
    @ArtistId INT,
    @DurationSeconds INT,
    @GenreId INT,
    @CreatedBy INT
)
AS
BEGIN TRY

    IF ISNULL(@SongId,0)=0
    BEGIN

        INSERT INTO Songs
        (
            Title,
            AlbumId,
            ArtistId,
            DurationSeconds,
            GenreId,
            CreatedBy
        )
        VALUES
        (
            @Title,
            @AlbumId,
            @ArtistId,
            @DurationSeconds,
            @GenreId,
            @CreatedBy
        )

    END

END TRY

BEGIN CATCH

    INSERT INTO ErrorLogs
    (
        ErrorMessage,
        StackTrace,
        Source
    )
    VALUES
    (
        ERROR_MESSAGE(),
        ERROR_PROCEDURE(),
        'SP_Song_Upsert'
    )

    --THROW

END CATCH

CREATE or alter  PROCEDURE SP_Playlists_Get
(
    @PlaylistId INT=NULL,
    @UserId INT
)
AS
BEGIN

IF @PlaylistId IS NULL
BEGIN

    SELECT
        PlaylistId,
        PlaylistName,
        CreatedDate
    FROM Playlists
    WHERE UserId=@UserId

END
ELSE
BEGIN

    SELECT
        P.PlaylistId,
        P.PlaylistName,
        S.SongId,
        S.Title,
        AR.ArtistName,
        A.Title AlbumName
    FROM Playlists P

    LEFT JOIN PlaylistSongs PS
        ON P.PlaylistId=PS.PlaylistId

    LEFT JOIN Songs S
        ON PS.SongId=S.SongId

    LEFT JOIN Artists AR
        ON S.ArtistId=AR.ArtistId

    LEFT JOIN Albums A
        ON S.AlbumId=A.AlbumId

WHERE
    P.PlaylistId=@PlaylistId
    AND P.UserId=@UserId
END

END

CREATE or alter  PROCEDURE SP_Playlist_Upsert
(
    @PlaylistId INT=NULL,
    @PlaylistName NVARCHAR(200),
    @UserId INT
)
AS
BEGIN TRY

    IF ISNULL(@PlaylistId,0)=0
    BEGIN

        INSERT INTO Playlists
        (
            PlaylistName,
            UserId
        )
        VALUES
        (
            @PlaylistName,
            @UserId
        )

    END
    ELSE
    BEGIN

       UPDATE Playlists
SET
    PlaylistName=@PlaylistName,
    UpdatedDate=GETDATE()
WHERE
    PlaylistId=@PlaylistId
    AND UserId=@UserId

    END

END TRY

BEGIN CATCH

    INSERT INTO ErrorLogs
    (
        ErrorMessage,
        StackTrace,
        Source
    )
    VALUES
    (
        ERROR_MESSAGE(),
        ERROR_PROCEDURE(),
        'SP_Playlist_Upsert'
    )

    --THROW

END CATCH

CREATE PROCEDURE SP_PlaylistSong_Manage
(
    @Action VARCHAR(20),
    @PlaylistId INT,
    @SongId INT
)
AS
BEGIN TRY

    IF @Action='ADD'
    BEGIN

        IF NOT EXISTS
        (
            SELECT 1
            FROM PlaylistSongs
            WHERE PlaylistId=@PlaylistId
            AND SongId=@SongId
        )
        BEGIN

            INSERT INTO PlaylistSongs
            (
                PlaylistId,
                SongId
            )
            VALUES
            (
                @PlaylistId,
                @SongId
            )

        END

    END

    ELSE IF @Action='DELETE'
    BEGIN

        DELETE FROM PlaylistSongs
        WHERE PlaylistId=@PlaylistId
        AND SongId=@SongId

    END

END TRY

BEGIN CATCH

    INSERT INTO ErrorLogs
    (
        ErrorMessage,
        StackTrace,
        Source
    )
    VALUES
    (
        ERROR_MESSAGE(),
        ERROR_PROCEDURE(),
        'SP_PlaylistSong_Manage'
    )

    --THROW

END CATCH

CREATE or  ALTER PROCEDURE SP_Playlist_Delete
(
    @PlaylistId INT,
    @UserId INT
)
AS
BEGIN TRY

    DELETE PS
    FROM PlaylistSongs PS
    INNER JOIN Playlists P
        ON P.PlaylistId=PS.PlaylistId
    WHERE
        P.PlaylistId=@PlaylistId
        AND P.UserId=@UserId

    DELETE FROM Playlists
    WHERE
        PlaylistId=@PlaylistId
        AND UserId=@UserId

END TRY
BEGIN CATCH

    INSERT INTO ErrorLogs
    (
        ErrorMessage,
        StackTrace,
        Source
    )
    VALUES
    (
        ERROR_MESSAGE(),
        ERROR_PROCEDURE(),
        'SP_Playlist_Delete'
    )

END CATCH

select * from Users

delete from Users where UserId = 3

update Users set RoleName = 'Admin' where UserId=4

select * from Albums

select * from ErrorLogs

select * from Artists

delete from Albums where ArtistId = 1002;

select * from Albums