import { Box, Button, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import React from 'react'
import { t } from 'i18next'
import { useConfirmActionDialog } from 'hooks/useConfirmActionDialog'
import ConfirmActionDialog from 'components/ConfirmActionDialog'

type ManagePollProps = {
    id: string | undefined
    handleDelete: () => void
    handleEndPoll: () => void
}

const ManagePoll = ({id, handleDelete, handleEndPoll}: ManagePollProps) => {
    const { open, showDialog, handleConfirm, handleClose } = useConfirmActionDialog();

    const handleEndPollWithDialog = () => {
        showDialog(handleEndPoll);
    }

    return (
        <>
        <ConfirmActionDialog 
            open={open}
            onClose={handleClose}
            onConfirm={handleConfirm}
            message={t('poll.close.confirm.message')}
            title={t('poll.close.confirm.title')}
          />
          
        <Box textAlign={{ xs: 'start', md: 'end'}} sx={{ my: 3 }}>
            <Link component={RouterLink} to={`/poll/edit/${id}`}>
                <Button variant="contained" color="primary" sx={{ mx: 1 }}>
                    {t('poll.edit')}
                </Button>
            </Link>
            <Button variant="contained" color="error" onClick={handleDelete} sx={{ mx: 1 }}>
                {t('poll.delete')}
            </Button>
            <Button variant="contained" color="warning" onClick={handleEndPollWithDialog} sx={{ mx: 1 }}>
                {t('poll.close.close')}
            </Button>
        </Box>
        
        </> )
}

export default ManagePoll