export type ProjectTypeProps = {
  collection: [
    [
      {
        format: string
        width: number
        height: number
        asset_id: string
        secure_url: string
        metadata: {
          title: string
          description: string
          date: string
          description_2?: string
        }
      },
    ],
  ]
}
