import { Typography, IconButton, Tooltip } from '@mui/material';
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { Song } from '../../types';
import { formatDuration } from '../../utils/formatDuration';
import { RowRoot, IndexCell, MetaCell } from './SongRow.styles';

interface SongRowProps {
  song: Song;
  index?: number;
  showAlbum?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
}

export default function SongRow({ song, index, showAlbum, onAdd, onRemove }: SongRowProps) {
  return (
    <RowRoot>
      <IndexCell>{index ?? '\u2022'}</IndexCell>

      <MetaCell>
        <Typography variant="body2" fontWeight={600} noWrap>
          {song.title}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap>
          {song.artistName}
          {showAlbum && song.albumTitle ? ` \u00b7 ${song.albumTitle}` : ''}
        </Typography>
      </MetaCell>

      <Typography variant="caption" color="text.secondary">
        {formatDuration(song.durationSeconds)}
      </Typography>

      <div>
        {onAdd && (
          <Tooltip title="Add to playlist">
            <IconButton size="small" onClick={onAdd} sx={{ color: 'text.secondary' }}>
              <PlaylistAddRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        {onRemove && (
          <Tooltip title="Remove from playlist">
            <IconButton size="small" onClick={onRemove} sx={{ color: 'text.secondary' }}>
              <DeleteOutlineRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </RowRoot>
  );
}
