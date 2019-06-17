class CreateFavouritecities < ActiveRecord::Migration[5.2]
  def change
    create_table :favouritecities do |t|
      t.string :cityfavourite
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
