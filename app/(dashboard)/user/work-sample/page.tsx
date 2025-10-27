'use client'
import WorkSampleManager from '@/components/works/work-sample'
import { useTalent } from '@/hooks/use-talent'
import { useWorkSample } from '@/hooks/use-work'
import { RootState } from '@/lib/redux/store'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function page() {
    const { talent, fetchTalentByUserId } = useTalent()
    const { user } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (user?.id) {
            fetchTalentByUserId(user.id)
          
        }
    }, [user?.id])
    if (!talent) {
        return

    }else{

    }
    return (
        <div>
            <WorkSampleManager talentProfileId={talent?.id} />
        </div>
    )
}
